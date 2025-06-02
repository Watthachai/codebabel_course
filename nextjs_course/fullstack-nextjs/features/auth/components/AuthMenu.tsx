import { Avatar, AvatarImage } from '@/features/shadcn/components/ui/avatar';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/shadcn/components/ui/dropdown-menu';
import { getImagePath } from '@/features/shared/helpers/upload';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const AuthMenu = () => {
  const { data: session, status } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none">
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                session?.user.image
                  ? getImagePath(session.user.image)
                  : '/assets/images/avatar.png'
              }
              alt={session?.user.name ?? 'Anonymous User'}
            ></AvatarImage>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {status === 'authenticated' && (
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/auth/profile">Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem asChild>
            <span onClick={() => signOut({ redirect: false })}>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
      {status === 'unauthenticated' && (
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/auth/sign-up">Sign Up</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AuthMenu;
