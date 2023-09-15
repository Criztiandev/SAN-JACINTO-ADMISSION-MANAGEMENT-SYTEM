/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "./fragments/Fragments";
import { BaseProps } from "../interface/componentInterface";
import TableProvider from "../context/TableContext";
import TableHeader from "./fragments/Table/TableHeader";
import TableContent from "./fragments/Table/TableContent";
import TableAction from "./fragments/Table/TableAction";
import TableSearchBar from "./fragments/Table/TableSearchBar";
import TableFilter from "./fragments/Table/TableFilter";

interface TableProps extends BaseProps {
  data: any[];
  config: any[];
  layout: string;
}

const Table = ({ data, config, children, layout }: TableProps) => {
  return (
    <>
      <TableProvider data={data} config={config} layout={layout}>
        {children}
      </TableProvider>
    </>
  );
};

const Container = ({ children }: BaseProps) => {
  return (
    <div
      className={`relative border overflow-x-scroll  h-[400px] rounded-[5px] scroll`}>
      {children}
    </div>
  );
};

Table.Container = Container;
Table.Header = TableHeader;
Table.Body = TableContent;
Table.Action = TableAction;
Table.Parts = Fragment;

Table.SearchBar = TableSearchBar;
Table.Filter = TableFilter;

export default Table;
