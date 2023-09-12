import { useTableConfig } from "../../../context/TableContext";
import { useReactTable } from "@tanstack/react-table";
import IconButton from "../../IconButton";

const TableAction = () => {
  const config = useTableConfig();
  const table = useReactTable(config);

  const actions = [
    {
      title: "firstPage",
      icon: "I",
      function: () => table.setPageIndex(0),
      active: true,
    },

    {
      title: "prevPage",
      icon: "I",
      function: () => table.previousPage(),
      active: true,
    },

    {
      title: "nextPage",
      icon: "I",
      function: () => {
        table.nextPage();
      },
      active: true,
    },

    {
      title: "lastPage",
      icon: "I",
      function: () => table.setPageIndex(table.getPageCount() - 1),
      active: true,
    },
  ];

  return (
    <tfoot className=" bg-[#cccccc]">
      <tr className="flex justify-between px-6 py-3">
        {actions.map(items => (
          <td key={items.title}>
            <IconButton onClick={items.function} icon={items.icon} />
          </td>
        ))}
      </tr>
    </tfoot>
  );
};

export default TableAction;
