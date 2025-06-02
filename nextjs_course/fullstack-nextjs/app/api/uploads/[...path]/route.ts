import { readFile } from 'fs/promises';

interface Params {
  params: {
    path: string[];
  };
}

export const GET = async (req: Request, { params: { path } }: Params) => {
  const publicDir = __dirname.split('.next')[0] + 'public/uploads/';
  const fileUrl = path.join('/');
  const file = await readFile(`${publicDir}${fileUrl}`);

  return new Response(file);
};
