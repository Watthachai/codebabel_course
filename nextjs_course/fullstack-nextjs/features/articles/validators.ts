import { z } from 'zod';

export const add = z.object({
  title: z.string(),
});

export const update = add.partial();
