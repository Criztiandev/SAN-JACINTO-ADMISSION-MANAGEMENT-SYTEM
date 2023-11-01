import { ReactNode, MouseEvent } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ItemProps {
  icon: string;
  title: string;
}

type ComponentStyle = "contained" | "outlined" | "ghost" | "unstyled";

export interface BaseActionProps {
  as: ComponentStyle;
  className: string;
  name: string;
}

export interface BaseButtonProps extends BaseActionProps {
  type: "button" | "submit" | "reset";
  icon?: string;
  dir?: "left" | "right";
  disabled: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
