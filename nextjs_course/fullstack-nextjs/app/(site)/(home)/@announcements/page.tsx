import * as api from '@/features/announcements/api';
import AnnouncementList from '@/features/announcements/components/AnnouncementList';

const LatestArticleListPage = async () => {
  const announcements = await api.findAll({ limit: 3 });

  return <AnnouncementList announcements={announcements}></AnnouncementList>;
};

export default LatestArticleListPage;
