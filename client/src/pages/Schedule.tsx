/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseLayout from "../layouts/BaseLayout";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Button from "../components/Button";
import CalendarIcon from "../assets/icons/Calendar_Dark.svg";
import useURL from "../hooks/useURL";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Calendar from "../components/Calendar";
import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import CreateCalendar from "../containers/Schedule/CreateCalendar";
import ViewCalendar from "../containers/Schedule/ViewCalendar";
import FetchLoader from "../containers/General/FetchLoader";
import DeleteNotice from "../containers/Drawers/DeleteNotice";

const formatDate = (data: any) => {
  return data?.map(({ schedule, ...items }: any) => {
    const origDate = new Date(schedule?.end);
    origDate.setDate(origDate.getDate() - 1);

    const formatDate = origDate?.toISOString();

    return {
      start: new Date(schedule.start),
      end: formatDate,
      ...items,
    };
  });
};

const Schedule = () => {
  const { updateURL, queryParams } = useURL();

  const { data, isError, isLoading, refetch } = useFetch({
    route: "/schedule",
    key: ["schedules"],
  });

  const isRefetch = queryParams.get("refetch");
  const handleCreateSchedule = (data: any) => {
    const { start, end } = data;
    updateURL(`state=create&start=${start}&end=${end}`);
  };

  const handleSelectSchedule = (data: any) => {
    const { _id } = data;
    updateURL(`state=view&APID=${_id}`);
  };

  useEffect(() => {
    if (isRefetch) {
      refetch();
      updateURL("/");
    }
  }, [isRefetch]);

  return (
    <>
      <BaseLayout
        title="Schedule"
        actions={
          <Button
            icon={CalendarIcon}
            title="Create"
            onClick={() => updateURL("state=create")}
          />
        }
        free>
        <div className="relative  w-full rounded-[5px] flex flex-col gap-2 overflow-hidden  h-[78vh]">
          {isLoading || isError ? (
            <FetchLoader />
          ) : (
            <Calendar
              events={formatDate(data)}
              onSelectSlot={handleCreateSchedule}
              onDoubleClickEvent={handleSelectSchedule}
              localizer={momentLocalizer(moment)}
            />
          )}
        </div>
      </BaseLayout>

      <DrawerWrapper state="create" Component={CreateCalendar} />
      <DrawerWrapper state="view" Component={ViewCalendar} />
      <DrawerWrapper state="delete" Component={DeleteNotice} />
    </>
  );
};

export default Schedule;
