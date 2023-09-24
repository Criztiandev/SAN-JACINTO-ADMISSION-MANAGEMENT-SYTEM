import { Calendar as BigCalendar, CalendarProps } from "react-big-calendar";
import { Event as CustomEvent } from "../interface/dateInterface";

interface CalendarCustomProps
  extends Omit<CalendarProps<CustomEvent>, "events"> {
  events: CustomEvent[];
  onSelectEvent?: (event: CustomEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}

const Calendar = ({ events, ...props }: CalendarCustomProps) => {
  // sort the event based on the

  return (
    <BigCalendar
      selectable
      defaultView="month"
      views={["month", "agenda"]}
      events={events}
      {...props} // Spread the rest of the props
    />
  );
};

export default Calendar;
