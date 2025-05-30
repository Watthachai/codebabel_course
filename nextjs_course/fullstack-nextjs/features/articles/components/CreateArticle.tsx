'use client';

import { useCreateArticle } from '@/features/articles/hooks/api';

const CreateArticle = () => {
  const { mutateAsync } = useCreateArticle();

  return <button onClick={() => mutateAsync({ title: 'xxxx' })}>Create</button>;
};

export default CreateArticle;
