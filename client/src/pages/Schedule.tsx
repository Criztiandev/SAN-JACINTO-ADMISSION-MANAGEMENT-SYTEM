/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseLayout from "../layouts/BaseLayout";
import { useState, useTransition } from "react";
import ScheduleCalendar from "../containers/Schedule/ScheduleCalendar";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import BatchTable from "../containers/Schedule/BatchTable";
import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";
import CalendarIcon from "../assets/icons/Calendar_Dark.svg";

const Schedule = () => {
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [isPending, startTransition] = useTransition();

  const handleSelectTab = (target: string) => {
    startTransition(() => {
      setSelectedTab(target);
    });
  };

  return (
    <BaseLayout
      title="Schedule"
      actions={
        <div className="flex gap-4">
          <Button
            icon={CalendarIcon}
            as={selectedTab === "calendar" ? "contained" : "outlined"}
            title="Calendar"
            disabled={isPending}
            onClick={() => handleSelectTab("calendar")}
          />
          <Button
            icon={ApplicantIcon}
            title="Batch"
            as={selectedTab !== "calendar" ? "contained" : "outlined"}
            disabled={isPending}
            onClick={() => handleSelectTab("batch")}
          />
          <IconButton as="outlined" />
        </div>
      }
      free>
      <div className="relative  w-full rounded-[5px] flex flex-col gap-2 overflow-hidden  h-[78vh]">
        {selectedTab === "calendar" ? <ScheduleCalendar /> : <BatchTable />}
      </div>
    </BaseLayout>
  );
};

export default Schedule;

{
  /* <div className="flex justify-between items-center">
{selectedTab === "batch" ? <SearchBar dir="left" /> : <div></div>}

<div className="flex gap-4 items-center">
  <Button
    icon={CalendarIcon}
    as={selectedTab === "calendar" ? "contained" : "outlined"}
    title="Calendar"
    disabled={isPending}
    onClick={() => handleSelectTab("calendar")}
  />
  <Button
    icon={ApplicantIcon}
    title="Batch"
    as={selectedTab !== "calendar" ? "contained" : "outlined"}
    disabled={isPending}
    onClick={() => handleSelectTab("batch")}
  />
</div>
</div>
<section className="grid grid-cols-[1fr_300px] gap-4 h-full ">
<div className="relative  w-full rounded-[5px] flex flex-col gap-2 overflow-hidden">
  {selectedTab === "calendar" ? <ScheduleCalendar /> : <BatchTable />}
</div>

<aside className="border border-gray-400 rounded-[5px]"></aside>
</section> */
}
