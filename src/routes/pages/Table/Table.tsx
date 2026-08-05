import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  FluentProvider,
  webLightTheme,
  Spinner,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
} from "@fluentui/react-components";
import { columns } from "./table-columns";
import { usePeople } from "./fetchPeople";

export default function Table() {
  const { data, isLoading, isOffline, error, page, setPage } = usePeople();

  console.log(1, page);
  console.log(2, error);
  console.log(3, isOffline);

  return (
    <FluentProvider theme={webLightTheme}>
      {error ? (
        <>
          <h2 className="text-xl font-bold mb-2">Failed to load data</h2>
          <p>{error}</p>
        </>
      ) : isLoading ? (
        <Spinner label="Loading Star Wars data..." />
      ) : (
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
      )}

      <button
        disabled={isLoading || data?.previous === null}
        onClick={() => setPage(page - 1)}
        className={data?.previous === null ? "text-red-600" : ""}
      >
        Previous
      </button>
      <button
        disabled={isLoading || data?.next === null}
        onClick={() => setPage(page + 1)}
        className={data?.next === null ? "text-red-600" : ""}
      >
        Next
      </button>

      <Dialog open={isOffline}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Connection Lost</DialogTitle>
            <DialogContent>
              <div>
                <p>
                  We can't reach the Star Wars API. Please check your internet
                  connection.
                </p>
              </div>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
}
