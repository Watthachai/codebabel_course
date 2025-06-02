import * as z from 'zod';

export const add = z.object({
  leaveDate: z
    .string({
      required_error: 'A leave date is required',
    })
    .datetime(),
  reason: z.string({ required_error: 'A reason is required' }).min(1),
});

export const update = add.partial();
