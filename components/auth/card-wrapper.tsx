import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';

import { Social } from '@/components/auth/social';
import { BackButton } from '@/components/auth/back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  descriptionLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  descriptionLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
        <CardDescription>{descriptionLabel}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
