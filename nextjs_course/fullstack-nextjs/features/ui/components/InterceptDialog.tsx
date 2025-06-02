'use client';

import { Dialog, DialogContent } from '@/features/shadcn/components/ui/dialog';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

interface InterceptDialogProps {
  children: ReactNode;
}

const InterceptDialog = ({ children }: InterceptDialogProps) => {
  const router = useRouter();
  const closeDialog = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent>
        <ScrollArea className="min-h-[350px]">
          <div className="p-4 text-black">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default InterceptDialog;
