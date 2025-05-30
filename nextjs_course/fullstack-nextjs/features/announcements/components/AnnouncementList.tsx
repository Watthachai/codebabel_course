import { type findAll } from '@/features/announcements/api';

interface AnnouncementListProps {
  announcements: Awaited<ReturnType<typeof findAll>>;
}

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
  return (
    <ul>
      {announcements.map((announcement) => (
        <li key={announcement.id}>{announcement.title}</li>
      ))}
    </ul>
  );
};

export default AnnouncementList;
