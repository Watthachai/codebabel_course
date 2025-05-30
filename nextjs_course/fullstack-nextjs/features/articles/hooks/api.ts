import { type CreateArticleInput } from '@/features/articles/types';

export const useCreateArticle = () => {
  return {
    mutateAsync: (form: CreateArticleInput) => {
      return fetch('http://localhost:3000/api/admin/articles', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
};
