/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender } from "@tanstack/react-table";
import { Image } from "../../components";
import AscIcon from "../../assets/icons/Expand_up_light.svg";
import DescIcon from "../../assets/icons/Expand_down_light.svg";

interface TableHeaderProps {
  headers: any;
  layout: string;
}

const sortingIcons: any = {
  asc: <Image className="w-5 h-5" src={AscIcon} alt="asc_icon" />,
  desc: <Image className="w-5 h-5" src={DescIcon} alt="desc_icon" />,
};

const TableHeader = ({ headers, layout }: TableHeaderProps) => {
  return (
    <div
      className={`grid items-center justify-items-center sticky top-0 z-20`}
      style={{ gridTemplateColumns: layout }}>
      {headers.map(
        ({ id, column, getContext, isPlaceholder }: any, index: number) => {
          const sorting = column.getIsSorted();
          const selectedIcon =
            sorting === "asc" || sorting === "desc" ? sorting : "";

          return (
            <span
              key={id}
              className={`p-4 text-sm font-medium text-center bg-gray-200 w-full border-b flex items-center justify-center gap-2 ${
                index === 0 && "sticky left-0 top-0 z-10 justify-between"
              }`}
              onClick={column.getToggleSortingHandler()}>
              {isPlaceholder
                ? null
                : flexRender(column.columnDef.header, getContext())}
              {sortingIcons[selectedIcon]}
            </span>
          );
        }
      )}
    </div>
  );
};

export default TableHeader;
