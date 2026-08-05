import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
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
import { logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <title>Star Wars Characters</title>

      <Button
        onClick={handleLogout}
        className="sr-only focus:not-sr-only fixed! right-4 top-4"
      >
        Logout
      </Button>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="space-y-6 w-full max-w-5xl bg-white p-4">
          <h1 className="text-2xl font-bold">Star Wars Characters</h1>

          <div className="overflow-x-auto w-full min-h-96 lg:min-h-120.5 flex flex-col">
            {error ? (
              <div className="flex flex-col items-center justify-center my-auto text-red-600 text-center">
                <h2 className="text-lg">Failed to load data</h2>
                <p className="mb-4">{error}</p>
                <div className="flex gap-4">
                  <Button appearance="outline" onClick={refetch}>
                    Retry
                  </Button>
                  <Button appearance="primary" onClick={() => setPage(1)}>
                    Go to page 1
                  </Button>
                </div>
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
              disabled={
                isLoading || !!error || !data || data?.previous === null
              }
              onClick={() => setPage(page - 1)}
              appearance="secondary"
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              disabled={isLoading || !!error || !data || data?.next === null}
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
    </>
  );
}
