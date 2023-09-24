import { useState, useMemo, useCallback } from "react";
import { Event } from "../interface/dateInterface";

const useEvent = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const memoizedEvents = useMemo(() => events, [events]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt("New Event");

      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() - 1);
      if (title) {
        setEvents(prev => [...prev, { start, end: endDate, title }]);
      }
    },
    []
  );

  const handleSelectEvent = useCallback((event: Event) => {
    setSelected(event);
  }, []);

  return {
    selected,
    events: memoizedEvents,
    handleSelectSlot,
    handleSelectEvent,
  };
};

export default useEvent;
