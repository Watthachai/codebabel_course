import { type Profile, type Signup } from '@/features/auth/types';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    async mutationFn(input: Signup) {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      const profile = await (res.json() as Promise<Profile>);

      return profile;
    },
  });
};

export const useEditProfile = () => {
  return useMutation({
    async mutationFn(input: FormData) {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        body: input,
      });
      const profile = await (res.json() as Promise<Profile>);

      return profile;
    },
  });
};
