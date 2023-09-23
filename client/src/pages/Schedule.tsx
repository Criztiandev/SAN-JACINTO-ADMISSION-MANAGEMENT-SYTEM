import Calendar from "../components/Calendar";
import useEvent from "../hooks/useEvent";
import BaseLayout from "../layouts/BaseLayout";
const Schedule = () => {
  const { event, handleSelectEvent, handleSelectSlot } = useEvent();

  return (
    <BaseLayout title="Schedule" action>
      <section className="grid grid-cols-[300px_auto] gap-4 h-full">
        <div className="border border-gray-300 rounded-md"></div>
        <Calendar
          event={event}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      </section>
    </BaseLayout>
  );
};

export default Schedule;
