/* eslint-disable @typescript-eslint/no-explicit-any */
import TableProvider from "../context/TableContext";
import { ComponentProps } from "../interface/CommonInterface";
import TableAction from "./fragments/Tables/Actions";
import TableContent from "./fragments/Tables/Content";
import TableHeader from "./fragments/Tables/Header";

interface TableProps extends ComponentProps {
  header: any;
  payload: any;
}

const Table = ({ header, payload, children }: TableProps) => {
  return (
    <TableProvider header={header} payload={payload}>
      <table className="rounded-[5px] overflow-hidden">{children}</table>
    </TableProvider>
  );
};

Table.Header = TableHeader;
Table.Content = TableContent;
Table.Action = TableAction;

export default Table;
