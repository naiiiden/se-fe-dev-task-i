import {
  createTableColumn,
  type TableColumnDefinition,
} from "@fluentui/react-components";
import type { Person } from "./types";
import { formatFieldValue } from "../../../utils/format";

export const columns: TableColumnDefinition<Person>[] = [
  createTableColumn({
    columnId: "name",
    renderHeaderCell: () => "Name",
    renderCell: (item) => formatFieldValue(item.name),
  }),
  createTableColumn({
    columnId: "mass",
    renderHeaderCell: () => "Mass",
    renderCell: (item) => formatFieldValue(item.mass),
  }),
  createTableColumn({
    columnId: "height",
    renderHeaderCell: () => "Height",
    renderCell: (item) => formatFieldValue(item.height),
  }),
  createTableColumn({
    columnId: "hair_color",
    renderHeaderCell: () => "Hair Color",
    renderCell: (item) => formatFieldValue(item.hair_color),
  }),
  createTableColumn({
    columnId: "skin_color",
    renderHeaderCell: () => "Skin Color",
    renderCell: (item) => formatFieldValue(item.skin_color),
  }),
];
