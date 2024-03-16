import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

const Home = () => {
  return (
    <main className="h-full flex flex-col gap-6 justify-center items-center">
      <h1 className="text-2xl">Auth.js v5 + Next.js 14</h1>
      <LoginButton>
        <Button variant="secondary">Sign in</Button>
      </LoginButton>
    </main>
  );
};

export default Home;
