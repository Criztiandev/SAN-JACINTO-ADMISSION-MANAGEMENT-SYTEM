import PropTypes from "prop-types";
import { createContext, useState } from "react";

const ThemeContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = createContext(ThemeContext);

ThemeProvider.propTypes = {
  tokens: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const ThemeProvider = ({ tokens, children }) => {
  const [colors, setColors] = useState(tokens.colors);
  const [fonts, setFonts] = useState(tokens.typograhpy);
  return (
    <ThemeContext.Provider value={[colors, setColors, fonts, setFonts]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
