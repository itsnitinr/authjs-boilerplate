'use client';

import { UserRole } from '@prisma/client';

import { FormError } from '@/components/form-error';

import { useCurrentRole } from '@/hooks/use-current-role';

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You are not authorized to access this page." />;
  }

  return <>{children}</>;
};
