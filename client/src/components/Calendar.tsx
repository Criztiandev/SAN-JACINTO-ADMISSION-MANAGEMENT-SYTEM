import { useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

interface CalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
}

const Calendar = ({ events, onSelectEvent, onSelectSlot }: CalendarProps) => {
  const localizer = momentLocalizer(moment);
  const memoizedEvents = useMemo(() => events, [events]);

  return (
    <BigCalendar
      defaultView="month"
      views={["month", "week", "day"]}
      localizer={localizer}
      events={memoizedEvents}
      onSelectEvent={onSelectEvent}
      onSelectSlot={onSelectSlot}
      selectable
    />
  );
};

export default Calendar;
