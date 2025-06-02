import { Button } from '@/features/shadcn/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="mx-auto my-4 max-w-sm">
      <h2 className="text-center text-3xl font-bold">Not Found</h2>
      <p>Page Not Found</p>
      <Button asChild>
        <Link href="/">Go to Home Page</Link>
      </Button>
    </div>
  );
};

export default NotFound;
