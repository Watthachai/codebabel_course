import { findAll } from '@/features/articles/api';

export const GET = async () => {
  const articles = await findAll();

  return Response.json(articles);
};
