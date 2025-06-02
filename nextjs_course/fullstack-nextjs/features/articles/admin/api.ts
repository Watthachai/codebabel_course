import db from '@/features/shared/db';
import { type z } from 'zod';
import type * as validators from './validators';
import { slugify } from '@/features/shared/helpers/slugify';
import { revalidatePath } from 'next/cache';
import { saveFile } from '@/features/shared/helpers/file';

export const add = async (
  userId: number,
  input: z.infer<typeof validators.add>,
) => {
  if (!input.image) {
    throw new Error('No file uploaded');
  }
  const image = await saveFile(input.image);
  const article = await db.article.create({
    data: {
      ...input,
      userId,
      image,
      slug: slugify(input.title),
    },
  });
  revalidatePath('/articles');

  return article;
};

export const update = async (
  id: number,
  input: z.infer<typeof validators.update>,
) => {
  const article = await db.article.update({
    where: { id },
    data: {
      ...input,
      image: 'http://1234567890.com',
      userId: 1,
      slug: input.title ? slugify(input.title) : undefined,
    },
  });

  revalidatePath('/articles');
  revalidatePath(`/articles/${id}`);

  return article;
};

export const remove = async (id: number) => {
  const article = await db.article.delete({
    where: { id },
  });

  revalidatePath('/articles');
  revalidatePath(`/articles/${id}`);

  return article;
};
