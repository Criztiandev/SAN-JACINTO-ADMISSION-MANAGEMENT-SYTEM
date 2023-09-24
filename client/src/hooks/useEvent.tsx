import { useState, useMemo } from "react";
import { Event } from "../interface/dateInterface";

const useEvent = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const memoizedEvents = useMemo(() => events, [events]);

  return {
    selected,
    events: memoizedEvents,

    setEvents,
    setSelected,
  };
};

export default useEvent;
