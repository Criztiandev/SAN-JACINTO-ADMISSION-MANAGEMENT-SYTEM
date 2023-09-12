import { ReactNode } from "react";

export interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface TypographyProps extends ComponentProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p";
}
