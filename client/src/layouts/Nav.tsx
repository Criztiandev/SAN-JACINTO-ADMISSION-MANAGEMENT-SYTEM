import Logo from "../assets/image/Logo.png";
import { Avatar, Image } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { navigationPaths } from "../helper/Navigation.Helper";
import { motion } from "framer-motion";
import { IconProps } from "../interface/Layout.Types";
import { useConfigContext } from "../context/ConfigContext";
const Nav = () => {
  const { activePage, handleActivePage } = useConfigContext();
  const navigate = useNavigate();

  return (
    <nav className=" sticky top-0 py-4 px-[10px] w-[70px] flex justify-between items-center flex-col h-[100vh] border border-gray-300 ">
      <figure className="logo">
        <Link to="/">
          <Image src={Logo} alt="logo" />
        </Link>
      </figure>

      <ul className="flex flex-col gap-4">
        {navigationPaths.map(({ title, path, icon }: IconProps) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={title}
            title={title}
            className={`cursor-pointer rounded-[5px] hover:bg-gray-200 ${
              activePage === title ? "opacity-100" : "opacity-50"
            } `}
            onClick={handleActivePage}>
            <Link to={path}>
              <img src={icon} alt="Link" title={title} className="p-2" />
            </Link>
          </motion.li>
        ))}
      </ul>

      <button onClick={() => navigate("/user")}>
        <Avatar src="" />
      </button>
    </nav>
  );
};

export default Nav;
