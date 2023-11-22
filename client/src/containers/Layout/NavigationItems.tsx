import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Image from "../../components/Image";
interface OptionItems {
  title: string;
  icon: string;
  path?: string;
}

type NavigationItemProps = {
  selected: boolean;
  option: OptionItems[];
  icon: string;
  onToggle?: () => void;
};

const NavigationItem = ({
  selected,
  option,
  onToggle,
  icon,
}: NavigationItemProps) => {
  const location = useLocation();

  const renderSubmenuItems = () => {
    return option.map(({ title, icon, path }) => (
      <motion.li
        key={path}
        className={`${
          location.pathname === path ? "bg-gray-300 border" : ""
        } rounded-full`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <Link to={`${path}`}>
          <Image src={icon} alt={`${title} Link`} className="p-2" />
        </Link>
      </motion.li>
    ));
  };

  return (
    <div
      className={`${
        selected ? "bg-slate-400 border" : "opacity-70"
      } flex justify-center items-center flex-col gap-2 pb-2 px-1 rounded-full`}>
      <motion.span
        className={`${
          selected ? "bg-gray-400 border" : ""
        } rounded-full flex justify-center items-center`}
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        {!selected && <img src={icon} alt="Main Link" className="p-2" />}
      </motion.span>

      {selected && (
        <motion.ul className="flex gap-2 flex-col">
          {renderSubmenuItems()}
        </motion.ul>
      )}
    </div>
  );
};

export default NavigationItem;
