import { type LeaveItem } from '@/features/leaves/types';
import { Badge } from '@/features/shadcn/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { toDateString } from '@/features/shared/helpers/date';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { statusColor } from '@/features/leaves/helpers/leave-status';

const LeaveItem = ({ id, reason, status, leaveDate }: LeaveItem) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="font-bold">
        <Link href={`/leaves/${id}`}>{toDateString(leaveDate)}</Link>
      </CardHeader>
      <CardContent>{reason}</CardContent>
      <Separator></Separator>
      <CardFooter className="flex items-center justify-between px-6 py-4">
        <Badge className={statusColor(status)}>{status}</Badge>
        <Link href={`/leaves/${id}/edit`}>
          <Edit className="h-6 w-6"></Edit>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LeaveItem;
