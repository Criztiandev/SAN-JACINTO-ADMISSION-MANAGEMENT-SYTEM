/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, Fragment } from "react";
import IconButton from "./IconButton";
import { ComponentType } from "../interface/Component.Type";
import Button from "./Button";
import { motion } from "framer-motion";
interface DropdownProps extends ComponentType {
  as?: "icon" | "button";
  icon?: string;
  dir?: "left" | "right";
  title?: string;
  disabled?: boolean;
  name?: string;
  style?: any;
  zIndex?: number;
}

const Dropdown = ({
  as,
  type,
  title,
  icon,
  children,
  className,
  disabled,
  name,
  style,
  zIndex,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  // Mouse event handle to open the dropdown
  const handleOpen = () => setOpen(prev => !prev);

  // forward ref to the comonent
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // close the drawer when click outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const current = buttonRef.current;
      const target = event.target as Node;
      if (current && !current.contains(target)) setOpen(false);
    };

    // Mount the Listener
    document.addEventListener("click", handleClickOutside);

    // clean up the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const ComponentRender = as === "icon" ? IconButton : Button;

  return (
    <motion.div className="relative">
      <ComponentRender
        disabled={disabled}
        ref={buttonRef}
        title={title}
        dir="left"
        type={type}
        icon={icon}
        onClick={handleOpen}
        name={name}
      />
      {open && (
        <div
          className={`bg-white min-w-[100px] min-h-[100px]  max-h-[350px] absolute right-0 top-[3.5rem] border rounded-[5px] shadow-md ${
            zIndex ? zIndex : "z-50"
          } ${className && className}`}
          style={style}>
          {children}
        </div>
      )}
    </motion.div>
  );
};

Dropdown.Items = Fragment;

Dropdown.defaultProps = {
  as: "icon",
  type: "contained",
};

export default Dropdown;
