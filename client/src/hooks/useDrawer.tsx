import { useState } from "react";

const useDrawer = () => {
  const [data, setData] = useState<Array<object>>([]);
  const [active, setActive] = useState<boolean>(false);

  return {
    data,
    active,
    setData,
    setActive,
  };
};

export default useDrawer;
