import { IconProps } from "../interface/Layout.Types";
import {
  DashboardIcon,
  ApplicantIcon,
  CalendarIcon,
  MessageIcon,
  ToolsIcon,
} from "../assets/icons";

export const navigationPaths: IconProps[] = [
  { path: "/", icon: DashboardIcon },
  { path: "/applicants", icon: ApplicantIcon },
  { path: "/schedule", icon: CalendarIcon },
  { path: "/annoucement", icon: MessageIcon },
  { path: "/tools", icon: ToolsIcon },
];
