import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const IconButton = ({ className, variants, icon, ...props }) => {
  const { variant, tokens } = useTheme();
  const { button } = tokens;

  const base = ` p-[${button.iconP}]`;

  return (
    <button {...props} className={`${base} ${variant[variants]} ${className}`}>
      <img className="w-[24px] h-[24px]" src={icon} alt="" />
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
  size: "md",
};

export default IconButton;
