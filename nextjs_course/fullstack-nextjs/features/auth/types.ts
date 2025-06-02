import type * as validators from './validators';
import type * as z from 'zod';

export type Signin = z.infer<typeof validators.signin>;

export type Signup = z.infer<typeof validators.signup>;

export type ProfileForm = z.infer<typeof validators.profile>;

export type Role = 'MEMBER' | 'MEDERATOR' | 'ADMIN';

export interface Profile {
  id: string | number;
  email: string;
  image?: string;
  name: string;
  role: Role;
}
