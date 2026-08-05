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
  Button,
} from "@fluentui/react-components";
import { columns } from "./table-columns";
import { usePeople } from "./fetchPeople";
import gif from "../../../assets/giphy.gif?inline";

export default function Table() {
  const {
    data,
    isLoading,
    isOfflineModalOpen,
    setIsOfflineModalOpen,
    error,
    page,
    setPage,
    refetch,
  } = usePeople();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="space-y-6 w-full max-w-5xl bg-white p-4">
          <h1 className="text-2xl font-bold">Star Wars Characters</h1>

          <div className="overflow-x-auto w-full min-h-96 lg:min-h-120.5 flex flex-col">
            {error ? (
              <div className="flex flex-col items-center justify-center my-auto text-red-600 text-center">
                <h2 className="text-lg">Failed to load data</h2>
                <p className="mb-4">{error}</p>
                <Button appearance="outline" onClick={refetch}>
                  Retry
                </Button>
              </div>
            ) : isLoading ? (
              <Spinner size="medium" className="my-auto" />
            ) : (
              <DataGrid
                items={data?.results ?? []}
                columns={columns}
                getRowId={(item) => item.url}
                focusMode="composite"
                className="min-w-150 w-full"
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>
                        {renderHeaderCell()}
                      </DataGridHeaderCell>
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
          </div>

          <div className="flex justify-between items-center">
            <Button
              disabled={isLoading || data?.previous === null}
              onClick={() => setPage(page - 1)}
              appearance="secondary"
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              disabled={isLoading || data?.next === null}
              onClick={() => setPage(page + 1)}
              appearance="primary"
            >
              Next
            </Button>
          </div>
        </div>
      </main>

      <Dialog
        open={isOfflineModalOpen}
        onOpenChange={(_, dialogData) => setIsOfflineModalOpen(dialogData.open)}
      >
        <DialogSurface className="max-w-md! w-full">
          <DialogBody>
            <DialogTitle>Connection Lost</DialogTitle>
            <DialogContent className="space-y-4">
              <img src={gif} alt="" />
              <p>
                We can't reach the Star Wars API. Please check your internet
                connection.
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                onClick={() => setIsOfflineModalOpen(false)}
              >
                Close
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
}
