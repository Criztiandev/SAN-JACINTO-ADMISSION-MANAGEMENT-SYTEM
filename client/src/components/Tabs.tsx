import { BaseProps } from "../interface/Component.Type";
import { Fragment } from "./Fragments";

const Tabs = ({ children }: BaseProps) => {
  return <div>{children}</div>;
};

Tabs.List = Fragment;
Tabs.Link = Fragment;
Tabs.Content = Fragment;

export default Tabs;
