import React, { createContext, useContext, useState } from "react";
import { logoSumCanvas } from "./assets";

const ThemeContext = createContext({
  season: "spring",
  logo: { logoSumCanvas },
  setSeason: () => {},
  setLogo: () => {},
});
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [season, setSeason] = useState("spring");
  const [logo, setLogo] = useState({ logoSumCanvas });

  return (
    <ThemeContext.Provider value={{ season, setSeason, logo, setLogo }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
