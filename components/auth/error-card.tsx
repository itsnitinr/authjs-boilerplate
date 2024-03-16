import { TriangleAlertIcon } from 'lucide-react';

import { CardWrapper } from '@/components/auth/card-wrapper';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      descriptionLabel="An error occurred while trying to sign you in. Please try again."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <TriangleAlertIcon className="mx-auto text-destructive my-4" />
    </CardWrapper>
  );
};
