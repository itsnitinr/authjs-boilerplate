import { TriangleAlertIcon } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 text-sm text-destructive flex items-center space-x-2 p-3 rounded-md">
      <TriangleAlertIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
