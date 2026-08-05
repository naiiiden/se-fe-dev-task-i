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
import { AUTH_KEY } from "../../../utils/auth";
import { columns } from "./table-columns";
import { usePeople } from "./fetchPeople";

export default function Table() {
  console.log(1, localStorage.getItem(AUTH_KEY));

  const { data, page, setPage } = usePeople();

  console.log(2, page);

  return (
    <FluentProvider theme={webLightTheme}>
      <DataGrid
        items={data ?? []}
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

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      {/* temp hardcoded 10 */}
      <button disabled={page === 10} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </FluentProvider>
  );
}
