/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "../interface/componentInterface";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DrawerProps extends BaseProps {
  state: boolean;
  mode?: "light" | "dark";
  anchor?: "left" | "right";
  onClick?: () => void;
}

const sliderVariant = {
  open: {
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
  },
  close: {
    x: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
  },
};

const backdropVariant = {
  open: {
    display: "block",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
  },
  close: {
    display: "none",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 },
  },
};

const Drawer = ({
  anchor = "right",
  mode = "light",
  children,
  className,
  state,
  onClick,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const anchorDir = (dir: string) => (dir === "left" ? "left-0" : "right-0");

  // Use useEffect to control the body overflow based on the 'active' prop
  useEffect(() => {
    if (state) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    // Cleanup function when the component unmounts or 'active' prop changes
    return () => {
      document.body.style.overflow = "unset"; // Restore default body overflow
    };
  }, [state]);

  return (
    <>
      <motion.div
        initial={{ opacity: "50%", display: "none" }}
        animate={state ? "open" : "close"}
        variants={backdropVariant}
        className="fixed inset-0 back-drop w-full h-full bg-black z-20"
        onClick={onClick}></motion.div>
      <motion.aside
        ref={drawerRef}
        initial={{ x: "100%" }}
        animate={state ? "open" : "close"}
        variants={sliderVariant}
        className={`fixed w-[400px] ${
          mode === "light" ? "bg-white" : "bg-[#1e1e1e] "
        } h-full top-0 p-4 z-30 ] ${anchorDir(anchor)} ${
          className && className
        }`}>
        {children}
      </motion.aside>
    </>
  );
};

export default Drawer;
