/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "../interface/componentInterface";
import { Typography } from ".";
import { useRef } from "react";
import { Fragment } from "./Fragments";

interface DrawerProps extends BaseProps {
  title: string;
  subtitle: string;
  handleToggle: () => void;
  anchor?: "left" | "right";
}

const Drawer = ({
  anchor = "right",
  title,
  subtitle,
  children,
  handleToggle,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const anchorDir = { left: "left-0", right: "right-0" };

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

        <main className="p-4">{children}</main>
      </Drawer.Content>
    </div>
  );
};

Drawer.BackDrop = Fragment;
Drawer.Content = Fragment;

export default Drawer;
