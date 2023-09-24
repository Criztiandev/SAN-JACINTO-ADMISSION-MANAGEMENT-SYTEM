import { Image, SearchBar, Typography } from "../components";
import Calendar from "../components/Calendar";
import { DateFormat } from "../helper/dateHelper";
import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

const Schedule = () => {
  const { selected, events, handleSelectSlot, handleSelectEvent } = useEvent();

  return (
    <BaseLayout title="Schedule" action>
      <section className="grid grid-cols-[300px_auto] gap-4 h-full">
        <div className="border border-gray-300 rounded-md flex flex-col gap-4">
          <div className="px-4 pt-4">
            <Typography as="h6" className="mb-4">
              Upcoming Events
            </Typography>
            <SearchBar />
          </div>

          <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto p-4">
            {events.map(({ title, start, end }) => {
              const truncatedTitle =
                title && title.length >= 25
                  ? `${title.substring(0, 25)}...`
                  : title;

              return (
                <div
                  key={title}
                  className="border p-4 rounded-[5px] flex flex-col gap-2">
                  <Typography as="h6">{truncatedTitle}</Typography>
                  <span className="text-sm flex gap-2">
                    <Image className="w-5 h-5" src={CalendarIcon} />
                    {DateFormat(start.toString())} <span>-</span>{" "}
                    {DateFormat(end.toString())}
                  </span>
                  <span className="text-sm">Time</span>
                </div>
              );
            })}
          </div>
        </div>
        <Calendar
          events={events}
          onSelectSlot={handleSelectSlot}
          onDoubleClickEvent={handleSelectEvent}
          localizer={momentLocalizer(moment)}
        />
      </section>
    </BaseLayout>
  );
};

export default Schedule;
