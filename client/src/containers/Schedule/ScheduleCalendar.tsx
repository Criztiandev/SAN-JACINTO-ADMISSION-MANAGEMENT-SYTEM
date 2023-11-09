import { Calendar } from "../../components";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import FetchLoader from "../General/FetchLoader";
import { fetchAllData } from "../../utils/Api.utils";

const ScheduleCalendar = () => {
  const { data, isError, isLoading, isFetched } = useQuery({
    queryFn: async () => fetchAllData("schedules"),
    queryKey: ["admissionSched"],
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
      {/* <CreateScheduleDrawer state={true} onClose={() => {}} /> */}
    </>
  );
};

export default ScheduleCalendar;
