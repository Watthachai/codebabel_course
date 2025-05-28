import { Announcement } from "../types";

interface AnnoucementsDetialsProps {
    announcement: Announcement;
}

const AnnouncementsDetails = ({ announcement }: AnnoucementsDetialsProps) => {
    return <div>{announcement.title}</div>;
};

export default AnnouncementsDetails;
