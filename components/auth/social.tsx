'use client';

import { SiGoogle, SiGithub } from 'react-icons/si';

import { Button } from '@/components/ui/button';

export const Social = () => {
  return (
    <div className="flex w-full gap-2 items-center">
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <SiGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <SiGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
