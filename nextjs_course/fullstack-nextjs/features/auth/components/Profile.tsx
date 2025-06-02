'use client';

import type * as types from '@/features/auth/types';
import * as validators from '@/features/auth/validators';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/features/shadcn/components/ui/form';
import { Input } from '@/features/shadcn/components/ui/input';
import { getImagePath } from '@/features/shared/helpers/upload';
import ImageUploader from '@/features/ui/components/ImageUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ProfileProps {
  profile: types.Profile;
  onSubmit: (profile: types.ProfileForm) => Promise<void>;
}

const Profile = ({ profile, onSubmit }: ProfileProps) => {
  const form = useForm<types.ProfileForm>({
    resolver: zodResolver(validators.profile),
    defaultValues: {
      ...profile,
      password: '',
      image: undefined,
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 border-b border-dotted pb-4 text-center text-3xl font-bold text-gray-900">
        Profile
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8"
        >
          <ImageUploader
            defaultImage={
              profile.image
                ? getImagePath(profile.image)
                : '/assets/images/avatar.png'
            }
            onImageChanged={(image) => {
              form.setValue('image', image, { shouldValidate: true });
            }}
            error={form.formState.errors.image?.message}
            rounded
          ></ImageUploader>
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
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
