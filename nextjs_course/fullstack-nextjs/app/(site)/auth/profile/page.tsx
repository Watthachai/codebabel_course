'use client';

import Profile from '@/features/auth/components/Profile';
import { useEditProfile } from '@/features/auth/hooks/api';
import type * as types from '@/features/auth/types';
import { useUiStore } from '@/features/ui/store';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session, status, update: updateProfile } = useSession();
  const { mutateAsync } = useEditProfile();
  const setToast = useUiStore((state) => state.setToast);

  const handleUpdateProfile = async (input: types.ProfileForm) => {
    const formData = new FormData();
    if (input.name) formData.append('name', input.name);
    if (input.email) formData.append('email', input.email);
    if (input.password) formData.append('password', input.password);
    if (input.image) formData.append('image', input.image);
    const profile = await mutateAsync(formData);

    await updateProfile(profile);
    setToast({
      type: 'Success',
      message: 'Your profile has already been updated',
    });
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!session?.user) return null;

  return (
    <Profile
      profile={session?.user as types.Profile}
      onSubmit={handleUpdateProfile}
    ></Profile>
  );
};

export default ProfilePage;
