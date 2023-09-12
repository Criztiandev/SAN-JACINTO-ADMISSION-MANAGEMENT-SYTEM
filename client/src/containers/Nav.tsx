import Avatar from "../components/Avatar";
import Image from "../components/Image";

import DashboardIcon from "../assets/icons/Overview.svg";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import ScheduleIcon from "../assets/icons/Calendar.svg";
import MessageIcon from "../assets/icons/Message_light.svg";
import ToolsIcon from "../assets/icons/Structure_light.svg";

import IconButton from "../components/IconButton";
import { BaseProps } from "../interface/ComponentInterfaces";
interface iconProps extends BaseProps {
  path: string;
  icon: string;
}

const Nav = () => {
  const icons: iconProps[] = [
    { path: "/dashboard", icon: DashboardIcon },
    { path: "/applicants", icon: ApplicantIcon },
    { path: "/schedule", icon: ScheduleIcon },
    { path: "/message", icon: MessageIcon },
    { path: "/tools", icon: ToolsIcon },
  ];

  return (
    <nav className="sticky top-0 py-4 px-[10px] w-[70px] flex justify-between items-center flex-col h-[100vh] border border-black">
      <figure className="logo">
        <Image />
      </figure>

      <ul className="flex flex-col gap-4">
        {icons.map(el => (
          <li
            key={el.path}
            className="cursor-pointer p-2  rounded-[5px] hover:bg-blue-400 active:bg-blue-400">
            <IconButton icon={el.icon} />
          </li>
        ))}
      </ul>

      <Avatar />
    </nav>
  );
};

export default Nav;
