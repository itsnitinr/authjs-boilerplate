'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

import { verifyEmail } from '@/actions/verify-email';

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = useSearchParams().get('token');

  const verify = useCallback(() => {
    if (!token) {
      setError('Missing token');
      return;
    }

    if (token) {
      verifyEmail(token)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => {
          setError('Something went wrong');
        });
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <CardWrapper
      headerLabel="Verifying email..."
      descriptionLabel="Please wait while we verify your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col w-full justify-center items-center">
        {!error && !success && <Spinner />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

const Spinner = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-8 w-8 my-8 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
