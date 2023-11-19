/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FetchLoader from "../General/FetchLoader";
import Calendar from "../../components/Calendar";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

const AdmissionCalendar = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const { data, isError, isLoading, isFetched } = useFetch({
    route: "/schedule",
    key: ["schedules"],
  });

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

  if (isLoading || isError) {
    return <FetchLoader />;
  }

  return (
    <>
      {isFetched && (
        <Calendar
          events={scheduleData}
          onSelectSlot={() => {}}
          onDoubleClickEvent={() => {}}
          localizer={momentLocalizer(moment)}
        />
      )}
    </>
  );
};

export default AdmissionCalendar;
