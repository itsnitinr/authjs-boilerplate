'use client';

import * as z from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useTransition, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

import { LoginSchema } from '@/schemas';

import { login } from '@/actions/login';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);

  const [isSubmitting, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactorInput(true);
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      descriptionLabel="Login to your account to continue"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactorInput && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          render={({ slots }) => (
                            <>
                              <InputOTPGroup>
                                {slots.slice(0, 3).map((slot, index) => (
                                  <InputOTPSlot key={index} {...slot} />
                                ))}{' '}
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                {slots.slice(3).map((slot, index) => (
                                  <InputOTPSlot key={index + 3} {...slot} />
                                ))}
                              </InputOTPGroup>
                            </>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter the 2FA code sent to your email.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFactorInput && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          type="email"
                          placeholder="johndoe@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          type="password"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0">
                        <Link href="/auth/forgot-password">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {showTwoFactorInput ? 'Verify' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
