import * as api from '@/features/articles/admin/api';
import { getServerAuthSession } from '@/features/auth/auth';
import { revalidatePath } from 'next/cache';

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: 'Please login' }, { status: 401 });

  const formData = await req.formData();
  const image = formData.get('image') as File | null;
  const article = await api.add(+session.user.id, {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    image,
  });

  revalidatePath('/articles');

  return Response.json(article, { status: 201 });
};
