import { ChangeEvent } from "react";
import { BaseProps, ComponentStyle } from "./Common.Types";

export interface TypographyProps extends BaseProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p" | "span";
}

export interface SearchBarProps extends ComponentStyle {
  value?: string | number;
  disabled: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: unknown) => void;
}

export interface DropdownProps extends ComponentType {
  as?: "icon" | "button";
  dir?: "left" | "right";
  icon?: string;
  title?: string;
  disabled?: boolean;
  option: Array<OptionItem>;
}

export interface OptionItem {
  icon: string;
  title: string;
}
