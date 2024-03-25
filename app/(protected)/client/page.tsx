'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

import { UserDetails } from '@/components/user-details';

const ClientComponent = () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="text-lg text-center font-medium">Client component</h3>
      <UserDetails
        id={user?.id}
        name={user?.name}
        email={user?.email}
        role={user?.role}
        isTwoFactorEnabled={user?.isTwoFactorEnabled}
      />
    </div>
  );
};

export default ClientComponent;
