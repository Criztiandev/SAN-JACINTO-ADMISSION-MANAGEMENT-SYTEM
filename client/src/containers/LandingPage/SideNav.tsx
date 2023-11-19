import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Drawer from "../../components/Drawer";
import HamburgerMenu from "../../assets/icons/Menu.svg";
import { toast } from "react-toastify";
interface SidebarProps {
  state: boolean;
  onClick: () => void;
}

const SideNav = ({ state, onClick }: SidebarProps) => {
  const [hover, setHover] = useState("Home");

  return (
    <>
      {state && (
        <Drawer mode="dark" state={state} onClick={onClick}>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex justify-end items-end">
              <motion.button
                whileTap={{ scale: 0.7 }}
                className="p-4"
                onClick={onClick}>
                <img
                  src={HamburgerMenu}
                  alt="hamburger-icon"
                  className="w-8 h-8"
                />
              </motion.button>
            </div>

            <div className="px-16 flex flex-col gap-4">
              <span className="w-full text-sm italic  text-gray-400 ">
                Navigation
              </span>
              <ul className="text-white text-[48px] flex flex-col gap-4 ">
                {navList.map((link) => (
                  <motion.li
                    key={link.title}
                    animate={state ? "open" : "close"}
                    variants={TextVariant(link.delay)}
                    onHoverStart={() => setHover(link.title)}
                    className="relative text-gray-500 opacity-50 hover:text-white ">
                    <Link to={link.path} className="font-secondary">
                      {link.title}
                    </Link>

                    {hover === link.title && (
                      <motion.span
                        className="absolute border w-full left-0 bottom-0"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}></motion.span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

// Navigation Data
const navList = [
  {
    title: "Home",
    path: "/",
    delay: 2,
  },
  {
    title: "Admission",
    path: "/admission",
    delay: 3,
  },
  {
    title: "About",
    path: "/",
    delay: 4,
  },
];

// Animation
const TextVariant = (delay: number) => {
  return {
    open: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.05 * delay,
      },
    },
    close: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.05 * delay,
      },
    },
  };
};

export default SideNav;
