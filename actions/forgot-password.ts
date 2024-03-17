'use server';

import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { ForgotPasswordSchema } from '@/schemas';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const sendForgotPasswordEmail = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'User not found' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Email sent' };
};
