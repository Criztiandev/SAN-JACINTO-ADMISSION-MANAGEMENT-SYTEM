import { ReactNode } from "react";
import { BaseProps } from "../interface/Common.Types";

export interface CommonLayoutProps extends BaseProps {
  title?: string;
  subtitle?: string;
}

export interface IconProps extends BaseProps {
  path: string;
  icon: string;
  title?: string;
}

export interface BaseLayoutProps extends CommonLayoutProps {
  actions?: ReactNode;
  style?: "free" | "default";
}

export interface RegistrationLayoutProps extends BaseProps {
  activePanel: string;
}
