import db from "@/features/shared/db";
import { type z } from "zod";
import * as validators from "./validators";
import { slugify } from "@/features/shared/helpers/slugify";
import { revalidatePath } from "next/cache";

export const add = async (input: z.infer<typeof validators.add>) => {
    const article = await db.article.create({
        data: {
            ...input,
            userId: 1,
            image: "htp://adsjkladsjkldasjkl.com",
            slug: slugify(input.title),
        },
    });

    revalidatePath("/articles");

    return article;
};

export const update = async (
    id: number,
    input: z.infer<typeof validators.update>,
) => {
    const article = await db.article.update({
        where: { id },
        data: {
            ...input,
            image: "htp://adsjkladsjkldasjkl.com",
            userId: 1,
            slug: input.title ? slugify(input.title) : undefined,
        },
    });

    revalidatePath("/articles");
    revalidatePath(`/articles/${id}`);

    return article;
};

export const remove = async (id: number) => {
    const article = db.article.delete({
        where: { id },
    });

    revalidatePath("/articles");
    revalidatePath(`/articles/${id}`);

    return article;
};
