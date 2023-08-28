import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";
import { stringUpperCase } from "../../utils/string.utils";
import IconButton from "./IconButton";
import logo from "../assets/react.svg";
import Text from "./Text";

const Input = ({ name, onChange, placeholder, error }) => {
  const { variant, tokens } = useTheme();
  const { input } = tokens;

  const formattedPlaceholder =
    placeholder || `Enter your ${stringUpperCase(name)}`;

  return (
    <div className="flex flex-col gap-[0.5rem] max-w-[300px]">
      <label className="flex justify-between items-center" htmlFor={name}>
        <Text />
        <IconButton icon={logo} size="md" />
      </label>

      <input
        className={`text-[14px] px-[${input.horizontal}] py-[${input.vertical}] ${variant["default"]}`}
        type="text"
        name={name}
        onChange={onChange}
        placeholder={formattedPlaceholder}
      />

      <Text error={error} />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
