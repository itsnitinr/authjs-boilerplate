import { logout } from '@/actions/logout';

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  return (
    <span onClick={() => logout()} className="cursor-pointer">
      {children}
    </span>
  );
};
