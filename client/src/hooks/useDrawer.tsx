import { useState } from "react";

const useDrawer = () => {
  const [active, setActive] = useState(false);

  const toggleDrawer = () => setActive(prev => !prev);

  return { active, toggleDrawer, setActive };
};

export default useDrawer;
