import { useState, useMemo } from "react";
import { Event } from "../interface/Date.Type";

const useEvent = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
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
