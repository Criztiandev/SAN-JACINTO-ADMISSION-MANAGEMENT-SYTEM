import { ReactNode } from "react";
import Avatar from "../components/Avatar";
import Image from "../components/Image";

interface iconProps {
  path: string;
  icon: ReactNode;
}

const Nav = () => {
  const icons: iconProps[] = [
    {
      path: "/dashboard",
      icon: <span>I</span>,
    },
    {
      path: "/applicants",
      icon: <span>I</span>,
    },
    {
      path: "/schedule",
      icon: <span>I</span>,
    },
    {
      path: "/message",
      icon: <span>I</span>,
    },
    {
      path: "/tools",
      icon: <span>I</span>,
    },
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
            <span className="flex justify-center items-center w-6 h-6">
              {el.icon}
            </span>
          </li>
        ))}
      </ul>

      <Avatar />
    </nav>
  );
};

export default Nav;
