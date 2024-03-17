import { Navbar } from '@/components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col h-full gap-6 w-full justify-center items-center">
      <Navbar />
      <div className="max-w-xl w-full bg-primary-foreground p-3 rounded-lg border border-secondary">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
