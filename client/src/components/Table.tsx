/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from "../interface/CommonInterface";
import { BaseProps } from "../interface/ComponentInterfaces";

interface TableProps extends BaseProps {
  header: any;
  payload: any;
}

const Table = ({ children }: TableProps) => {
  return <table>{children}</table>;
};

export default Table;
