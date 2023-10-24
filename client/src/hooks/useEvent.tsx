import { useState, useMemo } from "react";
import { ScheduleEventProps } from "../interface/Date.Type";

const useEvent = () => {
  const [selected, setSelected] = useState<ScheduleEventProps | null>(null);
  const [events, setEvents] = useState<ScheduleEventProps[]>([
    {
      _id: "12312313123",
      title: "Nice",
      start: new Date(),
      end: new Date(),
    },
  ]);
  const memoizedEvents = useMemo(() => events, [events]);

  return {
    selected,
    events: memoizedEvents,

    setEvents,
    setSelected,
  };
};

export default useEvent;
