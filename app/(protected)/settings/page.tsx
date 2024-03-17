'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <Button variant="secondary" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
};

export default SettingsPage;
