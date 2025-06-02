import type * as types from '@/features/announcements/types';
import AnnouncementItem from './AnnouncementItem';
import { Separator } from '@/features/shadcn/components/ui/separator';

interface AnnouncementListProps {
  announcements: types.AnnouncementItem[];
}

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
  return (
    <section>
      <h1 className="my-4 text-center text-4xl font-bold">All Announcements</h1>
      <Separator className="my-4"></Separator>
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <AnnouncementItem
            key={announcement.id}
            {...announcement}
          ></AnnouncementItem>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementList;
