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

export default function Table() {
  console.log(1, localStorage.getItem(AUTH_KEY));

  return (
    <FluentProvider theme={webLightTheme}>
      <DataGrid
        items={[]}
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
    </FluentProvider>
  );
}
