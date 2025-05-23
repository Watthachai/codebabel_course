import ArticleForm from "./ArticleForm";
import ArticleList from "./ArticleList";

function App() {
  return (
    <main className="max-w-lg container mx-auto my-4">
      <h1 className="text-center text-3xl font-bold">Article List</h1>
      <ArticleForm></ArticleForm>
      <div className="my-4 h-[1px] w-full bg-black"></div>
      <ArticleList></ArticleList>
    </main>
  );
}

export default App;
