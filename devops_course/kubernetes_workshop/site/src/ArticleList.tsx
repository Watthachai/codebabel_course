import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export interface ArticleItem {
  id: string;
  title: string;
  content: string;
}

export function useGetArticles() {
  return useSWR("/articles", async () => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/articles`);
    const data = await (res.json() as Promise<ArticleItem[]>);

    return data;
  });
}

function ArticleList() {
  const { data, isLoading } = useGetArticles();

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="space-y-2">
      {data?.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default ArticleList;
