import { BaseProps } from "../interface/ComponentInterfaces";
import { Fragment } from "./fragments/Fragments";

const Tabs = ({ children }: BaseProps) => {
  return <div>{children}</div>;
};

Tabs.List = Fragment;
Tabs.Link = Fragment;
Tabs.Content = Fragment;

export default Tabs;
