/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "../interface/componentInterface";
import { Typography } from ".";
import { useEffect, useRef } from "react";
import { Fragment } from "./Fragments";

interface DrawerProps extends BaseProps {
  title: string | boolean;
  subtitle: string | number;
  handleToggle: () => void;
  active: boolean;
  anchor?: "left" | "right";
}

const Drawer = ({
  anchor = "right",
  title,
  subtitle,
  children,
  className,
  active,
  handleToggle,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const anchorDir = { left: "left-0", right: "right-0" };

  // Use useEffect to control the body overflow based on the 'active' prop
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when the drawer is active
    } else {
      document.body.style.overflow = "scroll"; // Allow scrolling when the drawer is not active
    }
    // Cleanup function when the component unmounts or 'active' prop changes
    return () => {
      document.body.style.overflow = "unset"; // Restore default body overflow
    };
  }, [active]);

  return (
    <div ref={drawerRef} className="fixed w-full h-full top-0 z-50">
      <Drawer.BackDrop
        className="relative w-full h-full bg-[#00000080]"
        onClick={handleToggle}></Drawer.BackDrop>

      <Drawer.Content
        className={`absolute top-0 w-[500px] bg-white h-full z-50 overflow-y-scroll ${anchorDir[anchor]}`}>
        <header className="border-b border-gray-300 py-4 mx-4">
          <Typography as="h1">{title}</Typography>
          <Typography as="p">{subtitle}</Typography>
        </header>

        <main className={`p-4 $ ${className && className}`}>{children}</main>
      </Drawer.Content>
    </div>
  );
};

Drawer.BackDrop = Fragment;
Drawer.Content = Fragment;

export default Drawer;
