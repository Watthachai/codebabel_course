'use client';

import ArticleList from '@/features/articles/admin/components/ArticleList';
import { useGetArticles } from '@/features/articles/admin/hooks/api';
import ProtectedRoute from '@/features/auth/guards/ProtectedRoute';

const ArticlesPage = () => {
  const articles = useGetArticles();

  if (!articles || articles.length === 0) return <div>No articles found</div>;
  return (
    <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
      <ArticleList articles={articles}></ArticleList>
    </ProtectedRoute>
  );
};

export default ArticlesPage;
