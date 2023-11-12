import { IconProps } from "../interface/Layout.Types";

import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";
import CalendarIcon from "../assets/icons/Calendar_Dark.svg";
import MessageIcon from "../assets/icons/Message_Dark.svg";
import ToolsIcon from "../assets/icons/Structure_light.svg";
import DasboardIcon from "../assets/icons/Overview_Dark.svg";

export const navigationPaths: IconProps[] = [
  { path: "/", icon: DasboardIcon, title: "Home" },
  { path: "/applicants", icon: ApplicantIcon, title: "Applicants" },
  { path: "/schedule", icon: CalendarIcon, title: "Schedule" },
  { path: "/annoucement", icon: MessageIcon, title: "Annoucement" },
  { path: "/tools", icon: ToolsIcon, title: "Tools" },
];
