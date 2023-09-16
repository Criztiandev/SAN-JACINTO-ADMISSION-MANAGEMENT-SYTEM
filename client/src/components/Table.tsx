/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "./Fragments";
import { BaseProps } from "../interface/componentInterface";
import TableProvider from "../context/TableContext";
import TableHeader from "../containers/Table/TableHeader";
import TableContent from "../containers/Table/TableContent";
import TableAction from "../containers/Table/TableAction";
import TableSearchBar from "../containers/Table/TableSearchBar";
import TableFilter from "../containers/Table/TableFilter";
import TablePagination from "../containers/Table/TablePagination";

interface TableProps extends BaseProps {
  data: any[];
  config: any[];
  layout: string;
}

const Table = ({ data, config, children, layout, className }: TableProps) => {
  return (
    <TableProvider data={data} config={config} layout={layout}>
      <section className={className}>{children}</section>
    </TableProvider>
  );
};

const BaseContent = ({ children }: BaseProps) => {
  return (
    <div
      className={`relative border overflow-x-scroll h-[400px] rounded-[5px]`}>
      {children}
    </div>
  );
};

Table.Container = {
  Header: Fragment,
  Content: BaseContent,
  Footer: Fragment,
};

Table.Head = TableHeader;
Table.Body = TableContent;
Table.Footer = Fragment;

Table.Separator = Fragment;

Table.Tools = {
  SearchBar: TableSearchBar,
  Filter: TableFilter,
  Action: TableAction,
  Pagination: TablePagination,
};

export default Table;
