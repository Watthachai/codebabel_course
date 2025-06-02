import { type findById, type findAll } from '@/features/announcements/api';

export type AnnouncementItem = Awaited<ReturnType<typeof findAll>>[number];

export type AnnouncementDetails = NonNullable<
  Awaited<ReturnType<typeof findById>>
>;
