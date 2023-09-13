import Avatar from "../components/Avatar";
import Image from "../components/Image";
import DashboardIcon from "../assets/icons/Overview.svg";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import ScheduleIcon from "../assets/icons/Calendar.svg";
import MessageIcon from "../assets/icons/Message_light.svg";
import ToolsIcon from "../assets/icons/Structure_light.svg";
import { Link } from "react-router-dom";
import { BaseProps } from "../interface/ComponentInterfaces";

interface IconProps extends BaseProps {
  path: string;
  icon: string;
}

const Nav = () => {
  const icons: IconProps[] = [
    { path: "/dashboard", icon: DashboardIcon },
    { path: "/applicants", icon: ApplicantIcon },
    { path: "/schedule", icon: ScheduleIcon },
    { path: "/message", icon: MessageIcon },
    { path: "/tools", icon: ToolsIcon },
  ];

  return (
    <nav className="sticky top-0 py-4 px-[10px] w-[70px] flex justify-between items-center flex-col h-[100vh] border ">
      <figure className="logo">
        <Link to="/">
          <Image src={DashboardIcon} alt="logo" />
        </Link>
      </figure>

      <ul className="flex flex-col gap-4">
        {icons.map(el => (
          <li
            key={el.path}
            className="cursor-pointer rounded-[5px] hover:bg-blue-400 active:bg-blue-400">
            <Link to={el.path}>
              <Image className="p-2" src={el.icon} alt={"Link Icon"} />
            </Link>
          </li>
        ))}
      </ul>

      <Avatar />
    </nav>
  );
};

export default Nav;
