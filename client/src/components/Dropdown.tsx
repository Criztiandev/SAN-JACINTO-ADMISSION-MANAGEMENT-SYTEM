import { useState } from "react";
import IconButton from "./IconButton";

interface DropdownProps {
  icon?: string;
}

const Dropdown = ({ icon }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(prev => !prev);

  return (
    <div className="relative">
      <IconButton onClick={handleOpen} icon={icon} />
      {open && (
        <ul className="bg-white p-4 absolute  right-0 top-10 w-52 border rounded-[5px] flex flex-col gap-2 shadow-md">
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
