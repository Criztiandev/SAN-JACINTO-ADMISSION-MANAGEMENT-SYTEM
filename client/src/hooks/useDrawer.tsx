import { useState } from "react";
import { useDrawerProps } from "../interface/Drawer.Types";
const useDrawer = (): useDrawerProps => {
  const [active, setActive] = useState(false);

  // Toggling Drawer
  const toggleDrawer = () => {
    setActive(prev => !prev);
  };

  return { active, toggleDrawer };
};

export default useDrawer;
