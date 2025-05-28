import { findById } from "@/features/announcements/api";
import AnnouncementsDetails from "@/features/announcements/components/AnnoucementsDetials";

interface AnnouncementsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const AnnouncementsPage = async ({ params }: AnnouncementsPageProps) => {
    const { id } = await params;
    const announcement = await findById(+id);

    return (
        <AnnouncementsDetails
            announcement={announcement}
        ></AnnouncementsDetails>
    );
};

export default AnnouncementsPage;
