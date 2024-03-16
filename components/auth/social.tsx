'use client';

import { signIn } from 'next-auth/react';
import { SiGoogle, SiGithub } from 'react-icons/si';

import { Button } from '@/components/ui/button';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const onClick = async (provider: 'google' | 'github') => {
    signIn(provider),
      {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      };
  };

  return (
    <div className="flex w-full gap-2 items-center">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick('google')}
      >
        <SiGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick('github')}
      >
        <SiGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
