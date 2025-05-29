import prisma from "@/features/shared/db";
import db from "@/features/shared/db";

export const findAll = async () => {
    const articles = await db.article.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            image: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    return articles;
};

export const findById = async (id: number) => {
    const article = await prisma.article.findUnique({
        where: { id },
    });

    return article;
};
