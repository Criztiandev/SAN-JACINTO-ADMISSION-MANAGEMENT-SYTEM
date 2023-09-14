import { useState } from "react";
import IconButton from "./IconButton";
import { ComponentType } from "../interface/ComponentInterfaces";

interface DropdownProps extends ComponentType {
  icon?: string;
}

const Dropdown = ({ type = "contained", icon }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(prev => !prev);

  return (
    <div className="relative">
      <IconButton type={type} onClick={handleOpen} icon={icon} />
      {open && (
        <ul
          className={`p-4 absolute  right-0 top-10 w-52 border rounded-[5px] flex flex-col gap-2 shadow-md`}>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
