import {
  type UpdateArticleInput,
  type AddArticleInput,
} from '@/features/articles/admin/types';
import {
  type ArticleDetails,
  type ArticleItem,
} from '@/features/articles/types';
import { useEffect, useState } from 'react';

export const useGetArticles = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const articles = await (res.json() as Promise<ArticleItem[]>);

    setArticles(articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return articles;
};

export const useGetArticle = (id: ArticleDetails['id']) => {
  const [article, setArticle] = useState<ArticleDetails>();

  const fetchArticle = async () => {
    const res = await fetch(`/api/articles/${id}`);
    const article = await (res.json() as Promise<ArticleDetails>);

    setArticle(article);
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return article;
};

export const useCreateArticle = () => {
  return {
    mutateAsync: async (form: AddArticleInput) => {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      if (form.image) formData.append('image', form.image);

      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        body: formData,
      });
      const article = await (res.json() as Promise<ArticleDetails>);

      return article;
    },
  };
};

export const useEditArticle = (id: ArticleDetails['id']) => {
  return {
    mutateAsync: async (form: UpdateArticleInput) => {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const article = await (res.json() as Promise<ArticleDetails>);

      return article;
    },
  };
};
