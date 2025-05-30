import { findById } from '@/features/articles/api';

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: Params) => {
  const article = await findById(+id);

  return Response.json(article);
};
