import { z } from 'zod';
import { image } from '@/features/shared/validators/image';

export const add = z.object({
  title: z.string().min(1, { message: 'ใส่มาดิ' }),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image,
});

export const update = add.partial();
