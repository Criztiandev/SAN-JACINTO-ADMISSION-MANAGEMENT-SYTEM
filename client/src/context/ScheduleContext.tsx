/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { BaseProps } from "../interface/Component.Type";
import {
  ScheduleContextValues,
  SelectedSlotProps,
} from "../interface/Schedule.Types";
import { ScheduleEventProps } from "../interface/Date.Type";

const ScheduleContext = createContext<ScheduleContextValues | undefined>(
  undefined
);

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error("Context Doest Exist");
  return context;
};

const ScheduleContextProvider = ({ children }: BaseProps) => {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEventProps | any>(
    {}
  );
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotProps | any>();

  const handleSelectedSlot = (start: Date, end: Date) =>
    setSelectedSlot({ start, end });

  const handleSelectedEvent = (details: ScheduleEventProps) =>
    setSelectedEvent(details);

  const value: ScheduleContextValues = {
    selectedSlot,
    handleSelectedSlot,

    selectedEvent,
    handleSelectedEvent,
  };
  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
