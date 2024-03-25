import { UserDetails } from '@/components/user-details';
import { currentUser } from '@/lib/auth';

const ServerComponent = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="text-lg text-center font-medium">Server component</h3>
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

export default ServerComponent;
