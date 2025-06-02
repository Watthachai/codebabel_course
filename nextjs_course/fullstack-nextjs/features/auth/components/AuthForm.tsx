'use client';

import type * as types from '@/features/auth/types';
import * as validators from '@/features/auth/validators';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/features/shadcn/components/ui/form';
import { Input } from '@/features/shadcn/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';

type AuthFormProps =
  | {
      kind: 'login';
      onSubmit: SubmitHandler<types.Signin>;
    }
  | {
      kind: 'register';
      onSubmit: SubmitHandler<types.Signup>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const form = useForm<
    typeof onSubmit extends SubmitHandler<types.Signin>
      ? types.Signin
      : types.Signup
  >({
    resolver: zodResolver(
      kind === 'login' ? validators.signin : validators.signup,
    ),
    defaultValues:
      kind === 'login'
        ? {
            email: '',
            password: '',
          }
        : {
            name: '',
            email: '',
            password: '',
          },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 border-b border-dotted pb-4 text-center text-3xl font-bold text-gray-900">
        {capitalize(kind)}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8"
        >
          {kind === 'register' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Taylor Swift" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="taylor@swift.com"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="secret password"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="absolute right-0">
            {capitalize(kind)}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
