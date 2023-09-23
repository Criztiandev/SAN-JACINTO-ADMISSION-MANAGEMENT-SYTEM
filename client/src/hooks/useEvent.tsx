import { useState, useMemo, useCallback } from "react";
import { Event } from "../interface/dateInterface";
const useEvent = () => {
  const [event, setEvent] = useState<Event[]>([]);
  console.log(event);
  const memoizedData = useMemo(() => event, [event]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt("New Event");
      if (title) setEvent(prev => [...prev, { start, end, title }]);
    },
    [setEvent]
  );

  const handleSelectEvent = useCallback(() => window.alert("Select Event"), []);

  return {
    event: memoizedData,
    handleSelectSlot,
    handleSelectEvent,
  };
};

export default useEvent;
