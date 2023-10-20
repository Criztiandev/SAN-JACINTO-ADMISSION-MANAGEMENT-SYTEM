import Avatar from "../components/Avatar";
import Image from "../components/Image";
import Logo from "../assets/image/Logo.png";
import DashboardIcon from "../assets/icons/Overview.svg";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import ScheduleIcon from "../assets/icons/Calendar.svg";
import MessageIcon from "../assets/icons/Message_light.svg";
import ToolsIcon from "../assets/icons/Structure_light.svg";
import { Link, useNavigate } from "react-router-dom";
import { BaseProps } from "../interface/Component.Type";

interface IconProps extends BaseProps {
  path: string;
  icon: string;
}

const icons: IconProps[] = [
  { path: "/", icon: DashboardIcon },
  { path: "/applicants", icon: ApplicantIcon },
  { path: "/schedule", icon: ScheduleIcon },
  { path: "/message", icon: MessageIcon },
  { path: "/tools", icon: ToolsIcon },
];

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className=" sticky top-0 py-4 px-[10px] w-[70px] flex justify-between items-center flex-col h-[100vh] border border-gray-300 ">
      <figure className="logo">
        <Link to="/">
          <Image src={Logo} alt="logo" />
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

      <button onClick={() => navigate("/user")}>
        <Avatar src="" />
      </button>
    </nav>
  );
};

export default Nav;
