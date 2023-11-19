/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { DrawerProps } from "../interface/Drawer.Types";

const Drawer = ({
  width,
  anchor = "right",
  children,
  className,
  state,
  onClick,
}: DrawerProps) => {
  const anchorDir = (dir: string) => (dir === "left" ? "left-0" : "right-0");

  return (
    <motion.div
      animate={state && "open"}
      variants={backdropVariant}
      className={`${
        state ? "grid" : "hidden"
      } fixed inset-0 back-drop w-full h-full z-20 grid-cols-[auto_600px] bg-[#00000080]`}>
      <div className="w-full h-full" onClick={onClick}></div>
      <motion.aside
        initial={{ x: "100%" }}
        animate={state ? "open" : "close"}
        variants={sliderVariant}
        style={{ width: width || "400px" }}
        className={`bg-white absolute p-4 ${anchorDir(
          anchor
        )} overflow-y-auto ${className && className}`}>
        {children}
      </motion.aside>
    </motion.div>
  );
};

export default Drawer;

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
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
  },
  close: {
    display: "none",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 },
  },
};

{
  /* <motion.div
        initial={{ display: "none" }}
        animate={state && "open"}
        exit={{
          display: "none",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 },
        }}
        variants={backdropVariant}
        className={`fixed inset-0 back-drop w-full h-full bg-black z-20 ${
          className && className
        }`}
        onClick={onClick}></motion.div>
      <motion.aside
        ref={drawerRef}
        initial={{ x: "100%" }}
        animate={state ? "open" : "close"}
        variants={sliderVariant}
        style={{ width: width || "400px" }}
        className={`fixed ${
          mode === "light" ? "bg-white" : "bg-[#1e1e1e] "
        } h-full top-0 p-4 z-30 ] ${anchorDir(anchor)} ${
          className && className
        }`}>
        {children}
      </motion.aside> */
}
