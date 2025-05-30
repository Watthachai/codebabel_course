import * as api from '@/features/articles/api';
import * as validators from '@/features/articles/validators';
import { type UpdateArticleInput } from '@/features/articles/types';

interface Params {
  params: {
    id: string;
  };
}

export const PATCH = async (req: Request, { params: { id } }: Params) => {
  const form = await (req.json() as Promise<UpdateArticleInput>);
  const formValidation = await validators.update.safeParseAsync(form);

  if (!formValidation.success) {
    return new Response(JSON.stringify(formValidation.error), {
      status: 422,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const article = await api.update(+id, formValidation.data);
  if (!article) return new Response(null, { status: 404 });

  return Response.json(article);
};

export const DELETE = async (_req: Request, { params: { id } }: Params) => {
  const index = await api.remove(+id);
  if (index === -1) return new Response(null, { status: 404 });

  return new Response(null, { status: 204 });
};
