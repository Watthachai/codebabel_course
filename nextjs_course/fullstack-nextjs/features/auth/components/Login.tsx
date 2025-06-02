'use client';

import AuthForm from '@/features/auth/components/AuthForm';
import { type Signin } from '@/features/auth/types';
import { useUiStore } from '@/features/ui/store';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const setToast = useUiStore((state) => state.setToast);
  const submit = async (credentials: Signin) => {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) {
      setToast({ type: 'Success', message: 'Welcome back!' });
      router.replace('/');
    }
    if (result?.error) {
      setToast({ type: 'Error', message: 'Invalid Credentials' });
    }
  };

  return <AuthForm kind="login" onSubmit={submit}></AuthForm>;
};

export default Login;
