'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/auth/user-button';

const links = [
  { href: '/settings', label: 'Settings' },
  { href: '/server', label: 'Server' },
  { href: '/client', label: 'Client' },
  { href: '/admin', label: 'Admin' },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-primary-foreground p-3 rounded-lg border border-secondary flex w-full justify-between items-center max-w-xl">
      <div className="flex items-center gap-2">
        {links.map(({ href, label }) => (
          <Button
            key={href}
            size="sm"
            variant={pathname === href ? 'default' : 'outline'}
            asChild
          >
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};
