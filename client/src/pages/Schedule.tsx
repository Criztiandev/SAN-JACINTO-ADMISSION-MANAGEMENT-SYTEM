/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBar, Button } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import { useState, useTransition } from "react";
import BatchTable from "../containers/Schedule/BatchTable";
import { ApplicantIcon, CalendarIcon } from "../assets/icons";
import ScheduleCalendar from "../containers/Schedule/ScheduleCalendar";

const Schedule = () => {
  const [selectedTab, setSelectedTab] = useState("calendar");

  const [isPending, startTransition] = useTransition();

  const handleSelectTab = (target: string) => {
    startTransition(() => {
      setSelectedTab(target);
    });
  };
  return (
    <BaseLayout title="Schedule">
      <div className="flex justify-between items-center">
        {selectedTab === "batch" ? <SearchBar dir="left" /> : <div></div>}

        <div className="flex gap-4 items-center">
          <Button
            icon={CalendarIcon}
            as={"outlined"}
            title="Calendar"
            disabled={isPending}
            onClick={() => handleSelectTab("calendar")}
          />
          <Button
            icon={ApplicantIcon}
            title="Batch"
            as={"outlined"}
            disabled={isPending}
            onClick={() => handleSelectTab("batch")}
          />
          {/* <Dropdown /> */}
        </div>
      </div>
      <section className="grid grid-cols-[auto_300px] gap-4">
        {selectedTab === "calendar" ? <ScheduleCalendar /> : <BatchTable />}

        <aside className="border border-gray-400 rounded-[5px]"></aside>
      </section>
      <div></div>
    </BaseLayout>
  );
};

export default Schedule;
