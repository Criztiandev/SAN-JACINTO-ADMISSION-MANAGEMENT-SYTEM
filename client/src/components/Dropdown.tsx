import { useState } from "react";
import IconButton from "./IconButton";

interface DropdownProps {
  icon: string;
}

const Dropdown = ({ icon }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(prev => !prev);

  return (
    <div>
      <IconButton onClick={handleOpen} icon={icon} />
      {open && (
        <ul>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
