import { type Announcement } from '@/features/announcements/types';

interface AnnouncementDetailsProps {
  announcement: Announcement;
}

const AnnouncementDetails = ({ announcement }: AnnouncementDetailsProps) => {
  return <div>{announcement.title}</div>;
};

export default AnnouncementDetails;
