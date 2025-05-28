import { findById } from "@/features/articles/api";
import ArticleDetails from "@/features/articles/components/ArticleDetials";

interface ArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export const generateStaticParams = () => {
    return [{ id: "1" }, { id: "3" }];
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
    const { id } = await params;
    const article = await findById(+id);

    return <ArticleDetails article={article}></ArticleDetails>;
};

export default ArticlePage;
