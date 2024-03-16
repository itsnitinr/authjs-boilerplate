import { CardWrapper } from '@/components/auth/card-wrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      descriptionLabel="Login to your account to continue"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial
    >
      Login form
    </CardWrapper>
  );
};
