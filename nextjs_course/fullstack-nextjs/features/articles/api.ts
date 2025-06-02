import db from '@/features/shared/db';

interface FindAllParams {
  limit?: number | undefined;
}

export const findAll = async ({ limit }: FindAllParams = {}) => {
  const articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: limit,
  });

  return articles;
};

export const findById = async (id: number) => {
  const article = await db.article.findUnique({
    where: { id },
  });

  return article;
};

export const findBySlug = async (slug: string) => {
  const article = await db.article.findUnique({
    where: { slug },
  });

  return article;
};
