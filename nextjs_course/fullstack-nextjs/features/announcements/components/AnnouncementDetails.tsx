'use client';
import { type AnnouncementDetails } from '@/features/announcements/types';

interface AnnouncementDetailsProps {
  announcement: AnnouncementDetails;
}

const AnnouncementDetails = ({
  announcement: { title, content },
}: AnnouncementDetailsProps) => {
  return (
    <article>
      <h2 className="my-4 text-center text-4xl font-bold">{title}</h2>
      <p className="my-4 text-xl">{content}</p>
    </article>
  );
};

export default AnnouncementDetails;
