'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { ResetPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Missing token' };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { password } = validatedFields.data;

  const passwordResetToken = await getPasswordResetTokenByToken(token);

  if (!passwordResetToken) {
    return { error: 'Invalid token' };
  }

  const hasExpired = new Date(passwordResetToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token expired' };
  }

  const user = await getUserByEmail(passwordResetToken.email);
  if (!user) {
    return { error: 'User not found' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  });

  return { success: 'Password updated' };
};
