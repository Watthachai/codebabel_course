import { type MetadataRoute } from 'next';
import * as articlesApi from '@/features/articles/api';
import * as announcementsApi from '@/features/announcements/api';

const sitemap = async () => {
  const baseUrl = process.env.NEXTAPP_URL!;
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
  ];

  const articles = await articlesApi.findAll();
  for (const article of articles) {
    sitemap.push({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  const announcements = await announcementsApi.findAll();
  for (const announcement of announcements) {
    sitemap.push({
      url: `${baseUrl}/announcements/${announcement.slug}`,
      lastModified: announcement.updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  return sitemap;
};

export default sitemap;
