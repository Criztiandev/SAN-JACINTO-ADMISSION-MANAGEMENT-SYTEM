import { useEffect, useRef, useState, MouseEventHandler } from "react";
import IconButton from "./IconButton";
import { ComponentType } from "../interface/ComponentInterfaces";
import Button from "./Button";

interface DropdownProps extends ComponentType {
  as?: "icon" | "button";
  icon?: string;
  dir?: "left" | "right";
  title?: string;
}

const Dropdown = ({ as, type, title, icon }: DropdownProps) => {
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
      {open && <Dropdown.Content />}
    </div>
  );
};

const Content = () => {
  return (
    <ul className="p-4 absolute right-0 top-[3.5rem] w-52 border rounded-[5px] flex flex-col gap-2 shadow-md">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
};

Dropdown.Content = Content;

Dropdown.defaultProps = {
  as: "icon",
  type: "contained",
};

export default Dropdown;
