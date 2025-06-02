import { findBySlug } from '@/features/articles/api';
import ArticleDetails from '@/features/articles/components/ArticleDetails';
import { getImagePath } from '@/features/shared/helpers/upload';
import { type Metadata } from 'next';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => {
  return [{ slug: '1' }, { slug: '3' }];
};

export async function generateMetadata({
  params: { slug },
}: ArticlePageProps): Promise<Metadata> {
  const article = await findBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      images: getImagePath(article.image),
    },
  };
}

const ArticlePage = async ({ params: { slug } }: ArticlePageProps) => {
  const article = await findBySlug(slug);

  if (!article) return <div>No article found</div>;
  return <ArticleDetails article={article}></ArticleDetails>;
};

export default ArticlePage;
