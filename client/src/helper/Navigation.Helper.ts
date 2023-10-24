import { IconProps } from "../interface/Layout.Types";
import {
  DashboardIcon,
  ApplicantIcon,
  CalendarIcon,
  MessageIcon,
  ToolsIcon,
} from "../assets/icons";

export const navIcons: IconProps[] = [
  { path: "/", icon: DashboardIcon },
  { path: "/applicants", icon: ApplicantIcon },
  { path: "/schedule", icon: CalendarIcon },
  { path: "/message", icon: MessageIcon },
  { path: "/tools", icon: ToolsIcon },
];
