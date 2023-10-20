/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { BaseProps } from "../interface/Component.Type";
import useDrawer from "../hooks/useDrawer";
import { DrawerValue } from "../interface/Drawer.Types";

const DrawerContext = createContext<DrawerValue | undefined>(undefined);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("No Drawer Context");

  return context;
};

const DrawerProvider = ({ children }: BaseProps) => {
  const viewDrawer = useDrawer();
  const createDrawer = useDrawer();
  const deleteDrawer = useDrawer();
  const updateDrawer = useDrawer();
  const editDrawer = useDrawer();
  const messageDrawer = useDrawer();
  const holdDrawer = useDrawer();

  const value = {
    viewToggle: viewDrawer,
    createToggle: createDrawer,
    deleteToggle: deleteDrawer,
    updateToggle: updateDrawer,
    editToggle: editDrawer,
    messageToggle: messageDrawer,
    holdToggle: holdDrawer,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
