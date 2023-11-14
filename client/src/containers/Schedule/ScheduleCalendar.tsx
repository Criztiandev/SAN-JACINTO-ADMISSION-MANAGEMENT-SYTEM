/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FetchLoader from "../General/FetchLoader";
import useFetch from "../../hooks/useFetch";
import Calendar from "../../components/Calendar";
import DrawerWrapper from "../Drawers/DrawerWrapper";
import useURL from "../../hooks/useURL";
import CreateCalendar from "./CreateCalendar";
import ViewCalendar from "./ViewCalendar";
import { useEffect, useState } from "react";
import DeleteNotice from "../Drawers/DeleteNotice";

interface ScheduleDetails {
  _id: string;
  title: string;
  start: Date;
  end: Date;
}

const ScheduleCalendar = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const { updateURL } = useURL();

  const { data, isError, isLoading, isFetched } = useFetch({
    route: "/schedule",
    key: ["schedules"],
  });

  const handleCreateSchedule = (data: any) => {
    const { start, end } = data;
    updateURL(`state=create&start=${start}&end=${end}`);
  };

  const handleSelectSchedule = (data: ScheduleDetails) => {
    const { _id } = data;
    updateURL(`state=view&APID=${_id}`);
  };

  useEffect(() => {
    if (isFetched) {
      const transformedPayload = data?.map(({ schedule, ...items }: any) => {
        return {
          start: new Date(schedule.start),
          end: new Date(schedule.end),
          ...items,
        };
      });
      setScheduleData(transformedPayload);
    }

    return () => {
      setScheduleData([]);
    };
  }, [isFetched]);

  if (isLoading || isError) return <FetchLoader />;

  return (
    <>
      <div className="flex justify-end mb-4"></div>
      {isFetched && (
        <Calendar
          events={scheduleData}
          onSelectSlot={handleCreateSchedule}
          onDoubleClickEvent={handleSelectSchedule}
          localizer={momentLocalizer(moment)}
        />
      )}

      <DrawerWrapper state="create" Component={CreateCalendar} />
      <DrawerWrapper state="view" Component={ViewCalendar} />
      <DrawerWrapper state="delete" Component={DeleteNotice} />
    </>
  );
};

export default ScheduleCalendar;
