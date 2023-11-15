/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseLayout from "../layouts/BaseLayout";
import ScheduleCalendar from "../containers/Schedule/ScheduleCalendar";
import Button from "../components/Button";
import CalendarIcon from "../assets/icons/Calendar_Dark.svg";
import useURL from "../hooks/useURL";

const Schedule = () => {
  const { updateURL } = useURL();

  return (
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
        <ScheduleCalendar />
      </div>
    </BaseLayout>
  );
};

export default Schedule;
