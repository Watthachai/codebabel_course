import { findAll } from "@/features/articles/api";
import ArticleList from "@/features/articles/components/ArticleList";

const ArticleListPage = async () => {
    const announcements = await findAll();

    return <ArticleList articles={announcements}></ArticleList>;
};

export default ArticleListPage;

export const revalidate = 15;
