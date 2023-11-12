import { Calendar } from "../../components";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FetchLoader from "../General/FetchLoader";
import useFetch from "../../hooks/useFetch";

const ScheduleCalendar = () => {
  const { data, isError, isLoading, isFetched } = useFetch({
    route: "/schedules",
    key: ["schedules"],
  });

  if (isLoading || isError) return <FetchLoader />;

  return (
    <>
      {isFetched && (
        <Calendar
          events={[] || data}
          onSelectSlot={() => {}}
          onDoubleClickEvent={() => {}}
          localizer={momentLocalizer(moment)}
        />
      )}
    </>
  );
};

export default ScheduleCalendar;
