import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const Button = ({ variants, dir, icon, children }) => {
  const { button } = useTheme();
  const base = `flex gap-[${button.gap}] px-[${button.horizontal}] py-[${button.vertical}] border border-[#D9D9D9] `;
  const _variants = {
    default: `${base} rounded-[5px]`,
    rounded: `${base} rounded-[24px]`,
    ghost: `${base} border-none`,
  };

  // direction element checker

  return (
    <button className={_variants[variants]}>
      {dir === "left" && icon ? <span>{icon}</span> : null}
      {children}
      {dir === "right" && icon ? <span>{icon}</span> : null}
    </button>
  );
};

Button.propTypes = {
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
