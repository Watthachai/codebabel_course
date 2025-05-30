import { type findAll } from '@/features/articles/api';
import Link from 'next/link';

interface ArticleListProps {
  articles: Awaited<ReturnType<typeof findAll>>;
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={`/articles/${article.id}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
