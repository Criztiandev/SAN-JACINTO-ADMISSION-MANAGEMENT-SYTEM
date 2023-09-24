import {
  Drawer,
  Image,
  Input,
  SearchBar,
  Select,
  Switch,
  Typography,
} from "../components";
import { useId } from "react";
import { DateFormat } from "../helper/dateHelper";
import { momentLocalizer } from "react-big-calendar";
import { Formik, Form, Field } from "formik";
import Calendar from "../components/Calendar";
import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import moment from "moment";
import useDrawer from "../hooks/useDrawer";
import scheduleModel from "../models/scheduleModel";

const Schedule = () => {
  const { active, setActive } = useDrawer();
  const { selected, events, setEvents, setSelected } = useEvent();
  const ids = useId();

  const toggleDrawer = () => {
    setActive(prev => !prev);
  };

  const toggleCreateEvent = () => {
    setActive(prev => !prev);
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
                const truncatedTitle =
                  title && title.length >= 25
                    ? `${title.substring(0, 25)}...`
                    : title;

                return (
                  <div
                    key={ids}
                    className="border p-4 rounded-[5px] flex flex-col gap-2">
                    <Typography as="h6">{truncatedTitle}</Typography>
                    <span className="text-sm flex gap-2">
                      <Image className="w-5 h-5" src={CalendarIcon} />
                      {DateFormat(start.toString())} <span>-</span>{" "}
                      {DateFormat(end.toString())}
                    </span>
                    <span className="text-sm">Time</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Calendar
            events={events}
            onSelectSlot={toggleCreateEvent}
            onDoubleClickEvent={toggleDrawer}
            localizer={momentLocalizer(moment)}
          />
        </section>
      </BaseLayout>
      {active && (
        <Drawer
          title="Create Schedule"
          subtitle="You can create event to this form, I miss you"
          handleToggle={() => setActive(prev => !prev)}>
          <Formik
            initialValues={scheduleModel}
            onSubmit={(value, action) => {}}>
            <Form className="flex flex-col gap-8">
              <section></section>

              <section className="grid grid-cols-2 gap-4 ">
                <Input label="Title" name="title" />
                <Input label="Venue" name="title" />
                <Select label="Audience" name="title">
                  <Select.Option value="" label="Choose Audience" />
                  <Select.Option value="Grade 7" label="Grade 7" />
                </Select>
                <Input
                  label="Speaker"
                  name="title"
                  placeholder="Enter the Speaker"
                />
              </section>

              <section className="grid grid-cols-2 gap-4">
                <Input label="Date Start" name="date.start" />
                <Input label="Date End" name="date.start" />
                <Input label="Time Start" name="date.start" />
                <Input label="Time End" name="date.start" />
                <Switch />
              </section>

              <section className="h-[300px] border"></section>
            </Form>
          </Formik>
        </Drawer>
      )}
    </>
  );
};

export default Schedule;
