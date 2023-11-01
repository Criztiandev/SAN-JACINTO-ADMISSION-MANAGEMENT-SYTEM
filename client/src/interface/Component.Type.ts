import { ChangeEvent } from "react";
import { BaseActionProps, BaseButtonProps, BaseProps } from "./Common.Types";

export interface TypographyProps extends BaseProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p" | "span";
}

export interface IconButtonProps extends BaseButtonProps {}

export interface SearchBarProps extends BaseActionProps {
  value?: string | number;
  disabled: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: unknown) => void;
}

export interface DropdownProps extends BaseButtonProps {
  title?: string;
  isIcon?: boolean;
  option: Array<OptionItem>;
}

export interface OptionItem {
  icon: string;
  title: string;
}
