import { ReactNode, ReactElement } from "react";
import { BaseProps } from "./Component.Type";

export interface DrawerProps extends BaseProps {
  width?: string;
  state: boolean;
  mode?: "light" | "dark";
  anchor?: "left" | "right";
  onClick?: () => void;
}

export interface useDrawerProps {
  active: boolean;
  toggleDrawer: () => void;
}

export interface DrawerValue {
  createToggle: useDrawerProps;
  viewToggle: useDrawerProps;
  deleteToggle: useDrawerProps;
  updateToggle: useDrawerProps;
  messageToggle: useDrawerProps;
  editToggle: useDrawerProps;
  holdToggle: useDrawerProps;
}

export interface DrawerListProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ReactNode | ReactElement | any;
  data?: object | Array<object> | string;
  state: boolean;
  onClose: () => void;
}
