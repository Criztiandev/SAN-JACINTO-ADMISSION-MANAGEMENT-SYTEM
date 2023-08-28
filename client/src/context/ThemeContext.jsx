import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

// Define PropTypes for the ThemeProvider component
ThemeProvider.propTypes = {
  tokens: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function ThemeProvider({ tokens, children }) {
  const buttonVariant = {
    default: `rounded-[5px]`,
    rounded: `rounded-[24px]`,
    ghost: `border-none`,
  };

  const values = { variant: buttonVariant, tokens };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
