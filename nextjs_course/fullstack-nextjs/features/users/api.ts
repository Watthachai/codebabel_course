import { type ProfileForm, type Signup } from '@/features/auth/types';
import bcrypt from 'bcryptjs';
import db from '@/features/shared/db';
import { removeDirFromFile, saveFile } from '@/features/shared/helpers/file';

export const findById = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  if (!user) throw new Error('user not found');
  return user;
};

export const add = async (input: Signup) => {
  const password = await hashPassword(input.password);
  const user = await db.user.create({
    data: {
      ...input,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
};

export const update = async (userId: number, input: ProfileForm) => {
  let { image } = await findById(userId);

  if (input.image) {
    const currentImage = image;
    image = await saveFile(input.image);
    if (currentImage) await removeDirFromFile(currentImage);
  }

  const user = await db.user.update({
    where: { id: userId },
    data: {
      ...input,
      image,
      password: input.password ? await hashPassword(input.password) : undefined,
    },
  });

  return user;
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};
