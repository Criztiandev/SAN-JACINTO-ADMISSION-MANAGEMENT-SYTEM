import { ReactNode } from "react";
import { BaseProps } from "../interface/Component.Type";

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
