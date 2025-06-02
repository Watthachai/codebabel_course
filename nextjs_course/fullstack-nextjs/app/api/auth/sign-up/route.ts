import { type Signup } from '@/features/auth/types';
import { signup } from '@/features/auth/validators';
import { add } from '@/features/users/api';

export const POST = async (req: Request) => {
  const body = await (req.json() as Promise<Signup>);

  try {
    const credentials = await signup.parseAsync(body);
    const profile = await add(credentials);

    return new Response(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 422 });
  }
};
