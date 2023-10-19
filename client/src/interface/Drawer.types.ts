import { ReactNode, ReactElement } from "react";

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
