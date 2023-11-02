/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBar, Button } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import { useState } from "react";
import BatchTable from "../containers/Schedule/BatchTable";
import { ApplicantIcon, CalendarIcon } from "../assets/icons";
import ScheduleCalendar from "../containers/Schedule/ScheduleCalendar";

const Schedule = () => {
  const currentDate = new Date();
  const [selectedTab, setSelectedTab] = useState("calendar");

  return (
    <>
      <BaseLayout title="Schedule">
        <div className="flex justify-between items-center">
          {selectedTab === "batch" ? (
            <SearchBar dir="left" />
          ) : (
            <div>{currentDate.getDate()}</div>
          )}

          <div className="flex gap-4 items-center">
            <Button
              icon={CalendarIcon}
              as={"outlined"}
              title="Calendar"
              onClick={() => setSelectedTab("calendar")}
            />
            <Button
              icon={ApplicantIcon}
              title="Batch"
              as={"outlined"}
              onClick={() => setSelectedTab("batch")}
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

      {/* <CreateScheduleDrawer
        state={createDrawer.active}
        onClick={createDrawer.toggleDrawer}
      />

      <ViewScheduleDrawer
        state={viewDrawer.active}
        onClick={viewDrawer.toggleDrawer}
      /> */}
    </>
  );
};

export default Schedule;
