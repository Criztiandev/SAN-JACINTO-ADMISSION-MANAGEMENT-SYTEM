import { useState } from "react";
import { useDrawerProps } from "../interface/Drawer.Types";
const useDrawer = (): useDrawerProps => {
  const [active, setActive] = useState(false);
  const toggleDrawer = () => setActive(prev => !prev);
  return { active, toggleDrawer };
};

export default useDrawer;
