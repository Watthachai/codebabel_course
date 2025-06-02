'use client';

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/features/shadcn/components/ui/alert';
import { Button } from '@/features/shadcn/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        {error.message}
        <Button
          variant="destructive"
          size="sm"
          className="my-2 block"
          onClick={reset}
        >
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default Error;
