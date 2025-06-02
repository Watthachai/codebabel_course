import ArticleDetails from '@/features/articles/admin/components/ArticleDetails';
import ArticleForm from '@/features/articles/admin/components/ArticleForm';
import { useCreateArticle } from '@/features/articles/admin/hooks/api';
import { type AddArticleInput } from '@/features/articles/admin/types';
import { type ArticleItem } from '@/features/articles/types';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/features/shadcn/components/ui/dialog';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import DataGrid, {
  type DataGridColumn,
} from '@/features/ui/components/DataGrid';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface ArticleListProps {
  articles: ArticleItem[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateArticle();
  const columns: DataGridColumn<ArticleItem>[] = [
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'slug',
      headerName: 'Slug',
    },
  ];

  const handleAddArticle = async (article: AddArticleInput) => {
    setOpen(false);
    await mutateAsync(article);
  };

  return (
    <>
      <DataGrid
        title="All Articles"
        columns={columns}
        rows={articles}
        detailsComponent={ArticleDetails}
      ></DataGrid>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="z-100 fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-blue-600 text-white drop-shadow"
          >
            <Plus></Plus>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ScrollArea className="max-h-[50vh]">
            <div className="p-4">
              <ArticleForm
                kind="create"
                onSubmit={handleAddArticle}
              ></ArticleForm>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleList;
