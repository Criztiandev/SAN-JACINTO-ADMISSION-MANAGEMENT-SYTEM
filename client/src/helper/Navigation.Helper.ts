import { IconProps } from "../interface/Layout.Types";
import {
  DashboardIcon,
  ApplicantIcon,
  CalendarIcon,
  MessageIcon,
  ToolsIcon,
  Dashboard,
} from "../assets/icons";

export const navigationPaths: IconProps[] = [
  { path: "/", icon: Dashboard },
  { path: "/applicants", icon: ApplicantIcon },
  { path: "/schedule", icon: CalendarIcon },
  { path: "/annoucement", icon: MessageIcon },
  { path: "/tools", icon: ToolsIcon },
];
