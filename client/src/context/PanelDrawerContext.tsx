import { ReactNode, createContext, useContext, useState } from "react";

interface DrawerContextType {
  drawerState: Record<string, boolean>;
  toggleDrawer: (componentId: string) => void;
  closeDrawer: (componentId: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const PanelDrawerContext = createContext<DrawerContextType | undefined>(
  undefined
);

export const usePanelDrawer = () => {
  const context = useContext(PanelDrawerContext);
  if (context === undefined) {
    throw new Error("Context Not Found");
  }
  return context;
};

const PanelDrawerProvider = ({ children }: ReactNode) => {
  const [drawerState, setDrawerState] = useState<Record<string, boolean>>({});

  const toggleDrawer = (componentID: string) => {
    setDrawerState(prev => ({
      ...prev,
      [componentID]: !prev[componentID],
    }));
  };

  const closeDrawer = (componentID: string) => {
    setDrawerState(prev => ({
      ...prev,
      [componentID]: false,
    }));
  };

  return (
    <PanelDrawerContext.Provider
      value={{
        drawerState,
        toggleDrawer,
        closeDrawer,
      }}>
      {children}
    </PanelDrawerContext.Provider>
  );
};

export default PanelDrawerProvider;
