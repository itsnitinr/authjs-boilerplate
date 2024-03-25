'use client';

import { toast } from 'sonner';
import { UserRole } from '@prisma/client';

import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';

import { admin } from '@/actions/admin';

const AdminPage = () => {
  const onApiRouteClick = async () => {
    const response = await fetch('/api/admin');

    if (!response.ok) {
      toast.error('Forbidden API route');
    } else {
      toast.success('Admin API route accessed');
    }
  };

  const onServerActionClick = async () => {
    const response = await admin();

    if (response.status === 403) {
      toast.error('Forbidden server action');
    } else {
      toast.success('Admin server action executed');
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="text-lg text-center font-medium">Admin</h3>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are an admin." />
        <div className="flex justify-between items-center">
          <h3>Admin-only API Route</h3>
          <Button variant="secondary" onClick={onApiRouteClick}>
            Test route
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <h3>Admin-only Server Action</h3>
          <Button variant="secondary" onClick={onServerActionClick}>
            Test action
          </Button>
        </div>
      </RoleGate>
    </div>
  );
};

export default AdminPage;
