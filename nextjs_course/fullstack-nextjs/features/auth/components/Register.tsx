'use client';

import AuthForm from '@/features/auth/components/AuthForm';
import { useRegister } from '@/features/auth/hooks/api';
import { type Signup } from '@/features/auth/types';
import { useUiStore } from '@/features/ui/store';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const { mutateAsync } = useRegister();
  const setToast = useUiStore((state) => state.setToast);
  const submit = async (credentials: Signup) => {
    await mutateAsync(credentials);
    setToast({ type: 'Success', message: 'You have already been registered' });
    router.replace('/');
  };

  return <AuthForm kind="register" onSubmit={submit}></AuthForm>;
};

export default Register;
