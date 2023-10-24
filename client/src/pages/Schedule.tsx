/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBar, Calendar, Dropdown, Button } from "../components";

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";

import { ScheduleEventProps } from "../interface/Date.Type";

import CreateScheduleDrawer from "../containers/Schedule/CreateScheduleDrawer";
import useDrawer from "../hooks/useDrawer";
import { useScheduleContext } from "../context/ScheduleContext";
import { useState, useTransition } from "react";
import BatchTable from "../containers/Schedule/BatchTable";
import ViewScheduleDrawer from "../containers/Schedule/ViewScheduleDrawer";
const Schedule = () => {
  const currentDate = new Date();
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [isPending, startTransition] = useTransition();

  const { handleSelectedEvent, handleSelectedSlot } = useScheduleContext();
  const createDrawer = useDrawer();
  const viewDrawer = useDrawer();
  const { events } = useEvent();

  const toggleCreateDrawer = ({ start, end }: ScheduleEventProps) => {
    createDrawer.toggleDrawer();

    // Update the Date Selection by One
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() - 1);
    handleSelectedSlot(start, endDate);
  };

  const toggleViewDrawer = (details: ScheduleEventProps) => {
    viewDrawer.toggleDrawer();
    handleSelectedEvent(details);
  };

  // const handleSubmit = (value, action) => {
  //   // customize the tail of the selection snake
  //   const endDate = new Date(selectedSlots.end);
  //   endDate.setDate(endDate.getDate() + 1);

  //   setEvents(prev => [
  //     ...prev,
  //     { title: value.title, start: selectedSlots.start, end: endDate },
  //   ]);

  //   // Query the value
  //   alert("Schedule Data is Successfully send to the database");
  //   action.resetForm();
  // };

  return (
    <>
      <BaseLayout title="Schedule" action>
        <div className="flex justify-between items-center">
          {selectedTab === "batch" ? (
            <SearchBar />
          ) : (
            <div>{currentDate.getDate()}</div>
          )}

          <div className="flex gap-4 items-center">
            <Button
              type={selectedTab === "calendar" ? "contained" : "outlined"}
              title="Calendar"
              onClick={() => setSelectedTab("calendar")}
            />
            <Button
              title="Batch"
              type={selectedTab === "batch" ? "contained" : "outlined"}
              onClick={() => setSelectedTab("batch")}
            />
            <Dropdown />
          </div>
        </div>
        <section className="grid grid-cols-[auto_300px] gap-4">
          {selectedTab === "calendar" ? (
            <Calendar
              events={events}
              onSelectSlot={toggleCreateDrawer}
              onDoubleClickEvent={toggleViewDrawer}
              localizer={momentLocalizer(moment)}
            />
          ) : (
            <BatchTable />
          )}

          <aside className="border border-gray-400 rounded-[5px]"></aside>
        </section>
        <div></div>
        {/* <section className="grid grid-cols-[300px_auto] gap-4 h-full border">
          <div className="border border-gray-300 rounded-md flex flex-col gap-4">
            <div className="px-4 pt-4">
              <Typography as="h6" className="mb-4">
                Batch List
              </Typography>
              <SearchBar />
            </div>

            <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto p-4">
              {events.map(({ title, start, end }) => {
                const startDateFormat = DateFormat({ format: start });
                const endDateFormat = DateFormat({ format: end });

                return (
                  <div
                    key={title}
                    className="border p-4 rounded-[5px] flex flex-col gap-2">
                    <Typography as="h6">{title}</Typography>
                    <span className="text-sm flex gap-2">
                      <Image className="w-5 h-5" src={""} />
                      <span>{startDateFormat}</span>
                      <span>{endDateFormat}</span>
                    </span>
                    <span className="text-sm">Time</span>
                  </div>
                );
              })}
            </div>
          </div>
        
        </section> */}
      </BaseLayout>

      <CreateScheduleDrawer
        state={createDrawer.active}
        onClick={createDrawer.toggleDrawer}
      />

      <ViewScheduleDrawer
        state={viewDrawer.active}
        onClick={viewDrawer.toggleDrawer}
      />
    </>
  );
};

export default Schedule;
