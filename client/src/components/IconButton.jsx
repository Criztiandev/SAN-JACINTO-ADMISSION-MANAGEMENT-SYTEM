import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const IconButton = ({ className, variants, icon, ...props }) => {
  const { variant, tokens } = useTheme();
  const { button } = tokens;
  const base = ` p-[${button.iconP}] border border-[${button.border}]`;

  return (
    <button {...props} className={`${base} ${variant[variants]} ${className}`}>
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
