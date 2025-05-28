import { findAll } from "@/features/announcements/api";

interface AnnouncementsListProps {
    announcements: Awaited<ReturnType<typeof findAll>>;
}

const AnnouncementsList = ({ announcements }: AnnouncementsListProps) => {
    return (
        <ul>
            {announcements.map((announcement) => (
                <li key={announcement.id}>{announcement.title}</li>
            ))}
        </ul>
    );
};

export default AnnouncementsList;
