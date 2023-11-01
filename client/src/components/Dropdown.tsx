import { motion } from "framer-motion";
import { IconButton, Button } from ".";
import { DropdownProps, OptionItem } from "../interface/Component.Type";
import useClickOutSide from "../hooks/useClickOutSide";
import { ApplicantIcon } from "../assets/icons";

const Dropdown = ({ as, className, option, ...props }: DropdownProps) => {
  const { ref, active, handleActive } = useClickOutSide();

  const ComponentRender = as === "icon" && !props.title ? IconButton : Button;

  return (
    <motion.div className="relative">
      <ComponentRender ref={ref} {...props} onClick={handleActive} />

      {active && (
        <motion.div
          className={`absolute right-0 top-[3.5rem] bg-white min-w-[100px] min-h-[100px]  max-h-[350px]  rounded-[5px] shadow-md z-50 ${
            className && className
          }`}>
          {option.map(({ icon, title }: OptionItem) => (
            <div className="flex gap-2">
              <img src={icon || ApplicantIcon} alt="icon" />
              <button>{title}</button>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dropdown;
