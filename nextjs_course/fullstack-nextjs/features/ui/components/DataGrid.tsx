import DataGridItem from '@/features/ui/components/DataGridItem';
import { type ReactElement } from 'react';

export interface DataRow {
  id: number | string;
}

export interface DataGridColumn<T extends DataRow> {
  field: keyof T;
  headerName: string;
}

export interface DataGridProps<T extends DataRow> {
  title: string;
  columns: DataGridColumn<T>[];
  rows?: T[];
  detailsComponent: (props: T) => ReactElement;
}

const DataGrid = <T extends DataRow>({
  title,
  columns,
  rows,
  detailsComponent,
}: DataGridProps<T>) => {
  return (
    <div>
      <h2 className="text-primary-500 text-center text-2xl font-bold">
        {title}
      </h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              {columns.map(({ headerName }) => (
                <th key={headerName} scope="col" className="px-6 py-3">
                  {headerName}
                </th>
              ))}
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          {rows && (
            <tbody>
              {rows.map((r) => {
                return (
                  <DataGridItem
                    key={r.id}
                    columns={columns}
                    row={r}
                    detailsComponent={detailsComponent}
                  ></DataGridItem>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DataGrid;

// const columns = [
//   {
//     field: 'title',
//     headerName: 'Title'
//   },
//   {
//     field: 'slug',
//     headerName: 'Slug'
//   }
// ]

// articles => [{ title: 'Article#1', id: 1, slug: 'article-1 }, { title: 'Article#2', id: 2, slug: 'article-2 }]
{
  /* <DataGrid title='All Articles' columns={columns} rows={articles}></DataGrid>


_________________________________
| ID | Title | Slug |
_________________________________
1 |Article#1|article-1
2 |Article#2|article-2 */
}
