import {
  createTableColumn,
  type TableColumnDefinition,
} from "@fluentui/react-components";

interface Person {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
}

export const columns: TableColumnDefinition<Person>[] = [
  createTableColumn({
    columnId: "name",
    renderHeaderCell: () => "Name",
    renderCell: (item) => item.name,
  }),
  createTableColumn({
    columnId: "mass",
    renderHeaderCell: () => "Mass",
    renderCell: (item) => item.mass,
  }),
  createTableColumn({
    columnId: "height",
    renderHeaderCell: () => "Height",
    renderCell: (item) => item.height,
  }),
  createTableColumn({
    columnId: "hair_color",
    renderHeaderCell: () => "Hair Color",
    renderCell: (item) => item.hair_color,
  }),
  createTableColumn({
    columnId: "skin_color",
    renderHeaderCell: () => "Skin Color",
    renderCell: (item) => item.skin_color,
  }),
];
