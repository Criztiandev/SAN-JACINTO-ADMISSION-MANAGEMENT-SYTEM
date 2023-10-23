/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBar, Typography, Calendar, Image } from "../components";

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";

import { Event } from "../interface/Date.Type";

import CreateScheduleDrawer from "../containers/Schedule/CreateScheduleDrawer";
import useDrawer from "../hooks/useDrawer";
import { useScheduleContext } from "../context/ScheduleContext";
import { DateFormat } from "../utils/Date.utils";

const Schedule = () => {
  const { handleSelectedSlot } = useScheduleContext();
  const createDrawer = useDrawer();
  const { events } = useEvent();

  const toggleCreateDrawer = ({ start, end }: Event) => {
    createDrawer.toggleDrawer();
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() - 1);
    handleSelectedSlot(start, end);
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
        <section className="grid grid-cols-[300px_auto] gap-4 h-full">
          <div className="border border-gray-300 rounded-md flex flex-col gap-4">
            <div className="px-4 pt-4">
              <Typography as="h6" className="mb-4">
                Upcoming Events
              </Typography>
              <SearchBar />
            </div>

            <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto p-4">
              {events.map(({ title, start, end }) => {
                return (
                  <div
                    key={title}
                    className="border p-4 rounded-[5px] flex flex-col gap-2">
                    <Typography as="h6">{title}</Typography>
                    <span className="text-sm flex gap-2">
                      <Image className="w-5 h-5" src={""} />
                      <span>
                        {DateFormat({ format: start, reverse: true })}
                      </span>
                      <span>{DateFormat({ format: end, reverse: true })}</span>
                    </span>
                    <span className="text-sm">Time</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Calendar
            events={[]}
            onSelectSlot={toggleCreateDrawer}
            onDoubleClickEvent={() => {}}
            localizer={momentLocalizer(moment)}
          />
        </section>
      </BaseLayout>

      {/* {(createEvent || viewEvent) && (
        <Drawer
          title={
            (createEvent && "Create Event") ||
            (viewEvent && `${selected?.title}`)
          }
          subtitle="You can create event to this form, I miss you"
          handleToggle={toggleCloseDrawer}>
          <Formik initialValues={scheduleModel} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-8">
              <CoverSelect />
              <CategorySelect />
              <ColorSelect />
              <DetailsInput />
              <DateSelect selected={selectedSlots} />
              <section className="h-[300px]">
                <Textarea label="Content" name="content" />
              </section>
              <section className="flex justify-end gap-4">
                <Button as="reset" type="outlined" title="Reset" />
                <Button
                  className="bg-red-800 text-white font-semibold"
                  as="submit"
                  type="outlined"
                  title="Submit"
                />
              </section>
            </Form>
          </Formik>
        </Drawer>
      )} */}

      <CreateScheduleDrawer
        state={createDrawer.active}
        onClick={createDrawer.toggleDrawer}
      />
    </>
  );
};

export default Schedule;
