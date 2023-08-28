import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ tokens, children }) => {
  const [colors, setColors] = useState(tokens.colors);
  const [fonts, setFonts] = useState(tokens.typograhpy);

  const updateColors = (newColors) => {
    setColors(newColors);
  };

  const updateFonts = (newFonts) => {
    setFonts(newFonts);
  };

  return (
    <ThemeContext.Provider value={{ colors, fonts, updateColors, updateFonts }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  tokens: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
