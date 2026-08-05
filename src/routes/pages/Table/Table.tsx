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
  DialogActions,
} from "@fluentui/react-components";
import { columns } from "./table-columns";
import { usePeople } from "./fetchPeople";

export default function Table() {
  const {
    data,
    isLoading,
    isOfflineModalOpen,
    setIsOfflineModalOpen,
    error,
    page,
    setPage,
  } = usePeople();

  console.log(1, page);
  console.log(2, error);
  console.log(3, isOfflineModalOpen);

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

      <Dialog
        open={isOfflineModalOpen}
        onOpenChange={(_, dialogData) => setIsOfflineModalOpen(dialogData.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Connection Lost</DialogTitle>
            <DialogContent>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  width="40px"
                  height="40px"
                  viewBox="0 -1 26 26"
                >
                  <path
                    fill-opacity=".3"
                    d="M24.24 8l1.35-1.68C25.1 5.96 20.26 2 13 2S.9 5.96.42 6.32l12.57 15.66.01.02.01-.01L20 13.28V8h4.24z"
                  />
                  <path d="M22 22h2v-2h-2v2zm0-12v8h2v-8h-2z" />
                </svg>
                <p>
                  We can't reach the Star Wars API. Please check your internet
                  connection.
                </p>
              </div>
            </DialogContent>
            <DialogActions>
              <button onClick={() => setIsOfflineModalOpen(false)}>
                Close
              </button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
}
