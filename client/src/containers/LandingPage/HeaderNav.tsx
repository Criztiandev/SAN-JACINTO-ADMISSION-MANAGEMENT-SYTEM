import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "../../assets/image/Logo.png";
import { useNavigate } from "react-router-dom";
import HambugerMenu from "../../assets/icons/Menu.svg";
import { useState } from "react";

interface HeaderNavProps {
  state?: boolean;
  onClick: () => void;
}

const HeaderNav = ({ state, onClick }: HeaderNavProps) => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll(); // this is not a reactive
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", latest => {
    const prevVal = scrollY.getPrevious();

    if (latest > prevVal && latest >= 150) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.nav
      variants={ToggleVariant}
      animate={hidden ? "visible" : "hidden"}
      className="w-full flex justify-between items-center">
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/")}>
        <img src={Logo} alt="logo-icon" className="w-20 h-20" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.7 }}
        className="p-4"
        onClick={onClick}>
        <img
          src={state ? HambugerMenu : HambugerMenu}
          alt="hamburger-icon"
          className="w-8 h-8"
        />
      </motion.button>
    </motion.nav>
  );
};

export default HeaderNav;

const ToggleVariant = {
  visible: { y: 0 },
  hidden: { y: "-150%" },
};
