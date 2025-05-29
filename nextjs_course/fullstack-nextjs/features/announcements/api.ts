import db from "@/features/shared/db";

export const findAll = async () => {
    const announcements = await db.announcement.findMany({
        select: {
            id: true,
            slug: true,
            title: true,
            excerpt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return announcements;
};

export const findById = async (id: number) => {
    const announcement = await db.announcement.findUnique({
        where: { id },
    });

    if (!announcement) throw new Error("announcement not found");

    return announcement;
};
