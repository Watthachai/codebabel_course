import { create } from '@/features/articles/api';
import { type CreateArticleInput } from '@/features/articles/types';
import { add } from '@/features/articles/validators';
import { revalidatePath } from 'next/cache';

export const POST = async (req: Request) => {
  const form = await (req.json() as Promise<CreateArticleInput>);
  const formValidation = await add.safeParseAsync(form);

  if (!formValidation.success) {
    return new Response(JSON.stringify(formValidation.error), {
      status: 422,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const article = await create(formValidation.data);
  revalidatePath('/articles');
  return new Response(JSON.stringify(article), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
