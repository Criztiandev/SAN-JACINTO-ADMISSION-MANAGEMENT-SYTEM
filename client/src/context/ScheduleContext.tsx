import { createContext, useContext, useState } from "react";
import { BaseProps } from "../interface/Component.Type";
import {
  ScheduleContextValues,
  SelectedSlotProps,
} from "../interface/Schedule.Types";

const ScheduleContext = createContext<ScheduleContextValues | undefined>(
  undefined
);

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error("Context Doest Exist");
  return context;
};

const ScheduleContextProvider = ({ children }: BaseProps) => {
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotProps>({
    start: "",
    end: "",
  });

  const handleSelectedSlot = (start: Date, end: Date) =>
    setSelectedSlot({ start, end });

  const value: ScheduleContextValues = {
    selectedSlot,
    handleSelectedSlot,
  };
  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
