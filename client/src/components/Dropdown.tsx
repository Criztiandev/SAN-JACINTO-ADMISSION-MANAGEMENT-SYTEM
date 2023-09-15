/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
  Fragment,
} from "react";
import IconButton from "./IconButton";
import { ComponentType } from "../interface/componentInterface";
import Button from "./Button";

interface DropdownProps extends ComponentType {
  as?: "icon" | "button";
  icon?: string;
  dir?: "left" | "right";
  title?: string;
}

const Dropdown = ({ as, type, title, icon, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  // Mouse event handle to open the dropdown
  const handleOpen: MouseEventHandler<HTMLButtonElement> = () =>
    setOpen(prev => !prev);

  // forward ref to the comonent
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    <div className="relative">
      <ComponentRender
        ref={buttonRef}
        title={title}
        dir="left"
        type={type}
        icon={icon}
        onClick={handleOpen}
      />
      {open && (
        <ul className="z-20 bg-white w-fit  absolute right-0 top-[3.5rem] border rounded-[5px] shadow-md">
          {children}
        </ul>
      )}
    </div>
  );
};

Dropdown.Items = Fragment;

Dropdown.defaultProps = {
  as: "icon",
  type: "contained",
};

export default Dropdown;
