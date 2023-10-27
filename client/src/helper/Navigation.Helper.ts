import { IconProps } from "../interface/Layout.Types";
import {
  ApplicantIcon,
  CalendarIcon,
  MessageIcon,
  ToolsIcon,
  Dashboard,
} from "../assets/icons";

export const navigationPaths: IconProps[] = [
  { path: "/", icon: Dashboard, title: "Home" },
  { path: "/applicants", icon: ApplicantIcon, title: "Applicants" },
  { path: "/schedule", icon: CalendarIcon, title: "Schedule" },
  { path: "/annoucement", icon: MessageIcon, title: "Annoucement" },
  { path: "/tools", icon: ToolsIcon, title: "Tools" },
];
