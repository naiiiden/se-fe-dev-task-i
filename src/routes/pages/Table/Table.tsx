import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import { columns } from "./table-columns";
import { usePeople } from "./fetchPeople";

export default function Table() {
  const { data, page, setPage } = usePeople();

  console.log(2, page);
  console.log(3, data);

  return (
    <FluentProvider theme={webLightTheme}>
      <DataGrid
        items={data?.results ?? []}
        columns={columns}
        getRowId={(item) => item.url}
        focusMode="composite"
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

      <button
        disabled={data?.previous === null}
        onClick={() => setPage(page - 1)}
        className={data?.previous === null ? "text-red-600" : ""}
      >
        Previous
      </button>
      <button
        disabled={data?.next === null}
        onClick={() => setPage(page + 1)}
        className={data?.next === null ? "text-red-600" : ""}
      >
        Next
      </button>
    </FluentProvider>
  );
}
