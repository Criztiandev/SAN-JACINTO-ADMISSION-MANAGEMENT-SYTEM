import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const IconButton = ({ variants, icon }) => {
  const { button } = useTheme();
  const base = ` p-[${button.iconP}] border border-[${button.border}]`;
  const _variants = {
    default: `${base} rounded-[5px]`,
    rounded: `${base} rounded-[24px]`,
    ghost: `${base} border-none`,
  };

  return (
    <button className={_variants[variants]}>
      <span className="block min-w-[24px] min-h-[24px] ">{icon}</span>
    </button>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  variants: PropTypes.oneOf(["default", "rounded", "ghost"]).isRequired,
  icon: PropTypes.node.isRequired,
};

IconButton.defaultProps = {
  variants: "default",
};

export default IconButton;
