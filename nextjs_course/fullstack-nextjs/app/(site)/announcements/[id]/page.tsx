import { findById } from '@/features/announcements/api';
import AnnouncementDetails from '@/features/announcements/components/AnnouncementDetails';

interface AnnouncementPageProps {
  params: {
    id: string;
  };
}

const AnnouncementPage = async ({ params: { id } }: AnnouncementPageProps) => {
  const announcement = await findById(+id);

  return (
    <AnnouncementDetails announcement={announcement}></AnnouncementDetails>
  );
};

export default AnnouncementPage;
