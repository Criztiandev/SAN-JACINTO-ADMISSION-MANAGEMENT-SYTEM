/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  SearchBar,
  Typography,
  Textarea,
  Calendar,
  Button,
  Image,
} from "../components";

import { momentLocalizer } from "react-big-calendar";
import { Formik, Form } from "formik";
import moment from "moment";
import { useState } from "react";

import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";
import scheduleModel from "../models/scheduleModel";

import { Event } from "../interface/Date.Type";
import {
  ColorSelect,
  CoverSelect,
  CategorySelect,
  DateSelect,
  DetailsInput,
} from "../containers/Schedule";
import { DateFormat } from "../helper/dateHelper";

const Schedule = () => {
  const [createEvent, setCreateEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<any>(undefined);
  const { selected, events, setSelected, setEvents } = useEvent();

  const toggleCreateDrawer = ({ start, end }: Event) => {
    setCreateEvent(prev => !prev);
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() - 1);

    setSelectedSlots({ start, end: endDate });
  };

  const toggleViewDrawer = (event: Event) => {
    setViewEvent(prev => !prev);
    setSelected(event);
  };

  const toggleCloseDrawer = () => {
    if (viewEvent) {
      setViewEvent(prev => !prev);
    }

    if (createEvent) {
      setCreateEvent(prev => !prev);
    }
  };

  const handleSubmit = (value, action) => {
    // customize the tail of the selection snake
    const endDate = new Date(selectedSlots.end);
    endDate.setDate(endDate.getDate() + 1);

    setEvents(prev => [
      ...prev,
      { title: value.title, start: selectedSlots.start, end: endDate },
    ]);

    // Query the value
    alert("Schedule Data is Successfully send to the database");

    toggleCloseDrawer();
    action.resetForm();
  };

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
            events={events}
            onSelectSlot={toggleCreateDrawer}
            onDoubleClickEvent={toggleViewDrawer}
            localizer={momentLocalizer(moment)}
          />
        </section>
      </BaseLayout>

      {(createEvent || viewEvent) && (
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
      )}
    </>
  );
};

export default Schedule;
