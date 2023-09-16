const ColumnConfig: ColumnDef<any, any>[] = [
  {
    header: "Name",
    accessorFn: ({ last_name, first_name, middle_name }: any) =>
      `${last_name}, ${first_name} ${middle_name}`,
    cell: ({ row, getValue }) => (
      <FirstColumn isSelection={selection} row={row} value={() => getValue()} />
    ),
  },
  { header: "LRN", accessorKey: "LRN" },
  { header: "Gender", accessorKey: "gender" },
  { header: "BOD", accessorKey: "BOD" },
  { header: "Age", accessorKey: "age" },
  { header: "Guardian", accessorKey: "guardian.legal" },
  { header: "Contact", accessorKey: "contact" },
  { header: "Ave", accessorKey: "remarks" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => <Badge title={getValue()} />,
  },
  {
    header: "Action",
    cell: ({ row }) => <ActionColumn row={row} disabled={selection} />,
  },
];
