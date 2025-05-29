import { z } from "zod";

export const add = z.object({
    title: z.string().min(1),
    excerpt: z.string().min(1),
    content: z.string().min(1),
    image: z.string().min(1),
});

export const update = add.partial();
