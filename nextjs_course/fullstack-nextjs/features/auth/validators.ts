import * as z from 'zod';
import { image } from '@/features/shared/validators/image';

export const signin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signup = signin.extend({
  name: z.string(),
});

export const profile = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().min(8).optional(),
  ),
  image: image.optional(),
});
