import { findAll, findById } from "@/features/announcements/api";

export type AnnoucementItem = Awaited<ReturnType<typeof findAll>>[number];

export type AnnouncementDetail = NonNullable<
    Awaited<ReturnType<typeof findById>>
>;
