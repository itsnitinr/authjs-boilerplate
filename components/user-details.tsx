import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface UserDetailsProps {
  id: string | undefined;
  name: string | undefined | null;
  email: string | undefined | null;
  role: string | undefined;
  isTwoFactorEnabled: boolean | undefined;
}

export const UserDetails = ({
  id,
  name,
  email,
  role,
  isTwoFactorEnabled,
}: UserDetailsProps) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableCell>{id}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableCell>{name}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableCell>{email}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableCell>{role}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Two Factor Enabled</TableHead>
          <TableCell>{isTwoFactorEnabled ? 'Yes' : 'No'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
