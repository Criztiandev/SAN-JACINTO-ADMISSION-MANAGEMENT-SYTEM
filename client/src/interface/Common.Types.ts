import { ReactNode } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ItemProps {
  icon: string;
  title: string;
}

export interface ComponentStyle {
  as?: "contained" | "outlined" | "ghost" | "unstyled";
}

export interface BaseActionProps extends ComponentStyle {
  dir?: "left" | "right";
  className: string;
  name: string;
  disabled: boolean;
}
