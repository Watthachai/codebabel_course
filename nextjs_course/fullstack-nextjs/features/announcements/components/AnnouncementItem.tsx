import type * as types from '@/features/announcements/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import Link from 'next/link';
import { truncate } from 'lodash';

const AnnouncementItem = ({ id, title, excerpt }: types.AnnouncementItem) => {
  return (
    <Link href={`/announcements/${id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{truncate(title, { length: 30 })}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{truncate(excerpt, { length: 100 })}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AnnouncementItem;
