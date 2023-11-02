import { ReactNode } from "react";
import { BaseProps } from "../interface/Common.Types";

export interface IconProps extends BaseProps {
  path: string;
  icon: string;
  title?: string;
}

export interface BaseLayoutProps extends BaseProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  style?: "free" | "default";
}

export interface HeaderLayoutProps extends BaseProps {
  title?: string;
  subtitle?: string;
}
