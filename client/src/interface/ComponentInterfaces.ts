import { ReactNode } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ComponentTyp extends BaseProps {
  type: "contained" | "outlined" | "ghost";
}

export interface TextProps extends BaseProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p";
}
