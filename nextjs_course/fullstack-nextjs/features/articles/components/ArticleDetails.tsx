'use client';
import { type Article } from '@/features/articles/types';
import { Button } from '@/features/shadcn/components/ui/button';

interface ArticleDetailsProps {
  article: Article;
  onUpdate: (id: Article['id']) => void;
}

const ArticleDetails = ({ article, onUpdate }: ArticleDetailsProps) => {
  return (
    <div>
      {article.title}
      <Button variant="outline" onClick={() => onUpdate(article.id)}>
        Update
      </Button>
    </div>
  );
};

export default ArticleDetails;
