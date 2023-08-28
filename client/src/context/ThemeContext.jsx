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
  return (
    <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
