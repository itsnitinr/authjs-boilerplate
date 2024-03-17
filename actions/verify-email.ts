'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const verifyEmail = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return { error: 'Invalid token' };
  }

  const hasExpired = new Date() > new Date(verificationToken.expires);

  if (hasExpired) {
    return { error: 'Token expired' };
  }

  const user = await getUserByEmail(verificationToken.email);

  if (!user) {
    return { error: 'User not found' };
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      // This will be used when user updates their email through the settings page
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: 'Email verified' };
};
