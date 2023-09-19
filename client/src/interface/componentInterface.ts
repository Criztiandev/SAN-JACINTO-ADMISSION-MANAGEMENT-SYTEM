import { ReactNode } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ComponentType extends BaseProps {
  type?: "contained" | "outlined" | "ghost" | "unstyled";
}

export interface TextProps extends BaseProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p" | "span";
}

export interface ProviderProps extends BaseProps {
  data: JSON;
}

export interface InputInterface {
  label?: string;
  name?: string;
  placeholder?: string;
}
