import { createContext, useContext, useMemo, useState } from "react";
import { BaseProps } from "../interface/componentInterface";

interface DrawProviderProps extends BaseProps {
  data: Array<object>;
}

interface DrawerContextValue {
  data: Array<object>;
  active: boolean;
  setActive: (value: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDrawerContext = (): DrawerContextValue => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("There is no Context");
  return context;
};

const DrawerProvider = ({ data, children }: DrawProviderProps) => {
  const [active, setActive] = useState<boolean>(false);
  const memoizedData = useMemo(() => data, [data]);

  const value: DrawerContextValue = {
    data: memoizedData,
    active,
    setActive,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
