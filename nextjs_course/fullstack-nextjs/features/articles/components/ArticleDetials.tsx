"use client";
import { type Article } from "@/features/articles/types";

interface ArticleDetailsProps {
    article: Article;
    onUpdate: (id: Article["id"]) => void;
}

const ArticleDetails = ({ article, onUpdate }: ArticleDetailsProps) => {
    return (
        <div>
            {article.title}
            <button onClick={() => onUpdate(article.id)}>Update</button>
        </div>
    );
};

export default ArticleDetails;
