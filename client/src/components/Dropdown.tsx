import { motion } from "framer-motion";
import IconButton from "./IconButton";
import Button from "./Button";
import { DropdownProps, OptionItem } from "../interface/Component.Type";
import useClickOutSide from "../hooks/useClickOutSide";
import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";

const Dropdown = ({ className, option, ...props }: DropdownProps) => {
  const { ref, active, handleActive } = useClickOutSide();

  const ComponentRender = props.icon && !props.title ? IconButton : Button;

  return (
    <motion.div className="relative">
      <ComponentRender ref={ref} {...props} onClick={handleActive} />

      {active && (
        <motion.div
          className={`absolute right-0 top-[3.5rem] bg-white min-w-[100px] min-h-[100px]  max-h-[350px]  rounded-[5px] shadow-md z-50 ${
            className && className
          }`}>
          {option.map(({ icon, title, onClick: optionClick }: OptionItem) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex gap-2 py-1"
              value={title}
              onClick={optionClick ? optionClick : props.onClick}>
              <img src={icon || ApplicantIcon} alt="icon" />
              <span>{title}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dropdown;
