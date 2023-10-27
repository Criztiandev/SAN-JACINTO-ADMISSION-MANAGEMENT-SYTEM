import { createContext, useContext, useState, MouseEvent } from "react";
import { BaseProps } from "../interface/Component.Type";

interface ConfigContextProps {
  activePage: string | undefined;
  handleActivePage: (e: MouseEvent<HTMLLIElement>) => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("There is no Config Context");

  return context;
};

const ConfigProvider = ({ children }: BaseProps) => {
  const [activePage, setActivePage] = useState<string | undefined>("Home");

  const handleActivePage = (e: MouseEvent<HTMLLIElement>) => {
    const title = e.currentTarget.title;
    if (!title) throw new Error("Element Doesnt have a title");
    setActivePage(title);
  };

  const value: ConfigContextProps = {
    activePage,
    handleActivePage,
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
