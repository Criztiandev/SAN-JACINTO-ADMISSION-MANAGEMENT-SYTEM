import { useTableConfig } from "../../../context/TableContext";
import { useReactTable, flexRender } from "@tanstack/react-table";

const TableHeader = () => {
  const config = useTableConfig();
  const { getHeaderGroups } = useReactTable(config);
  return (
    <thead className="bg-[#cccccc] flex border-b px-6 py-[20px] rounded-t-[5px]">
      {getHeaderGroups().map(rows => (
        <tr
          key={rows.id}
          className="w-full grid grid-cols-[30px_200px_auto_auto] gap-4">
          {rows.headers.map(header => (
            <th key={header.id} className="justify-self-start">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
