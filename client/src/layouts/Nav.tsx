import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/image/Logo.png";
import Avatar from "../components/Avatar";
import Image from "../components/Image";
import useLocalStorage from "../hooks/useLocalStorage";
import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";
import CalendarIcon from "../assets/icons/Calendar_Dark.svg";
import ArchieveIcon from "../assets/icons/Arhive_light.svg";
import OverviewIcon from "../assets/icons/Overview_Dark.svg";
import MaleProfile from "../assets/image/Male_profile.png";
import NavigationItem from "../containers/Layout/NavigationItems";
import BatchIcon from "../assets/icons/Batch.svg";
import FolterIcon from "../assets/icons/Folder_light.svg";

const Nav = () => {
  const { getItem, setItems } = useLocalStorage("navigation");
  const [selected, setSelected] = useState(getItem() || "");
  const navigate = useNavigate();

  const handleToggle = (action: string) => {
    setSelected(action);
    setItems(action);
  };

  const navigationItems = [
    {
      icon: ApplicantIcon,
      title: "Applicant",
      options: [
        { title: "Applicant", icon: ApplicantIcon, path: "/applicants" },
        { title: "Archive", icon: ArchieveIcon, path: "/archive" },
        { title: "Transferee", icon: ApplicantIcon, path: "/transferee" },
      ],
    },
    {
      icon: CalendarIcon,
      title: "Schedule",
      options: [
        { title: "Schedule", icon: CalendarIcon, path: "/schedule" },
        { title: "Batch", icon: BatchIcon, path: "/batch" },
        { title: "Examinees", icon: ApplicantIcon, path: "/examiniees" },
      ],
    },

    {
      icon: FolterIcon,
      title: "Masterlist",
      options: [
        { title: "Users", icon: FolterIcon, path: "/masterlist" },
        { title: "Users", icon: ApplicantIcon, path: "/users" },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 py-4 px-[10px] w-[70px] flex justify-between items-center flex-col h-[100vh] border border-gray-300">
      <figure className="logo">
        <Link to="/">
          <Image src={Logo} alt="logo" />
        </Link>
      </figure>

      <ul className="flex flex-col justify-center items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setItems("overview")}
          className={`${
            getItem() === "overview"
              ? "opacity-100 w-12 h-12 border bg-gray-200 flex justify-center items-center rounded-full"
              : "opacity-70"
          }`}>
          <Link to={"/"}>
            <Image src={OverviewIcon} alt="Overview" />
          </Link>
        </motion.div>

        {navigationItems.map((item) => (
          <NavigationItem
            key={item.title}
            icon={item.icon}
            option={item.options || []}
            selected={selected === item.title}
            onToggle={() => handleToggle(item.title)}
          />
        ))}
      </ul>

      <button onClick={() => navigate("/profile")}>
        <Avatar src={MaleProfile} />
      </button>
    </nav>
  );
};

export default Nav;
