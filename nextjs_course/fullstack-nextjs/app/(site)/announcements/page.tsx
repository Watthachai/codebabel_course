import { findAll } from '@/features/announcements/api';
import AnnouncementList from '@/features/announcements/components/AnnouncementList';

const AnnouncementsPage = async () => {
  const announcements = await findAll();

  return <AnnouncementList announcements={announcements}></AnnouncementList>;
};

export default AnnouncementsPage;

export const dynamic = 'force-dynamic';
