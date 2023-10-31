import { Calendar } from "../../components";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

const AdmissionCalendar = () => {
  return (
    <Calendar
      events={[]}
      onSelectSlot={() => {}}
      onDoubleClickEvent={() => {}}
      localizer={momentLocalizer(moment)}
    />
  );
};

export default AdmissionCalendar;
