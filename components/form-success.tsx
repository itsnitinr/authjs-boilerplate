import { CheckCircleIcon } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 text-sm text-emerald-500 flex items-center space-x-2 p-3 rounded-md">
      <CheckCircleIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
