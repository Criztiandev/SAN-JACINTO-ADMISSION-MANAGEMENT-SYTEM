import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const Button = ({ className, variants, dir, icon, children, ...props }) => {
  const { variant, tokens } = useTheme();
  const { button } = tokens;
  const base = `flex gap-[${button.gap}] px-[${button.horizontal}] py-[${button.vertical}]`;

  // direction element checker

  return (
    <button {...props} className={`${base} ${variant[variants]} ${className}`}>
      {dir === "left" && icon ? <span>{icon}</span> : null}
      {children}
      {dir === "right" && icon ? <span>{icon}</span> : null}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variants: PropTypes.oneOf(["default", "rounded", "ghost"]).isRequired,
  dir: PropTypes.oneOf(["right", "left"]).isRequired,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variants: "default",
  dir: "left",
};

export default Button;
