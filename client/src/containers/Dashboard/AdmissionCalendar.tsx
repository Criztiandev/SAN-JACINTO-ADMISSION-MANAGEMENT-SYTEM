import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import FetchLoader from "../General/FetchLoader";
import axios from "axios";
import Calendar from "../../components/Calendar";
// const temporarySchedules = [
//   {
//     title: "Admission Schedule",
//     start: new Date("2023-11-1:00:00"),
//     end: new Date("2023-11-30:00:00"),
//     color: "#FF5733",
//   },
//   {
//     title: "Admission Schedule 2",
//     start: new Date("2023-02-01"),
//     end: new Date("2023-02-05"),
//   },
//   {
//     title: "Admission Schedule 3",
//     start: new Date("2023-03-10"),
//     end: new Date("2023-03-15"),
//   },
//   {
//     title: "Admission Schedule 4",
//     start: new Date("2023-04-05"),
//     end: new Date("2023-04-10"),
//   },
//   {
//     title: "Admission Schedule 5",
//     start: new Date("2023-05-20"),
//     end: new Date("2023-05-25"),
//   },
// ];

interface Schedule {
  title: string;
  start: Date;
  end: Date;
}

const AdmissionCalendar = () => {
  const { data, isError, isLoading, isFetched } = useQuery<Schedule[]>({
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/schedules`),
    queryKey: ["admissionSched"],
  });

  if (isLoading || isError) {
    return <FetchLoader />;
  }

  return (
    <>
      {isFetched && (
        <Calendar
          events={[] || data}
          onSelectSlot={() => {}}
          onDoubleClickEvent={() => {}}
          localizer={momentLocalizer(moment)}
        />
      )}
      {/* <CreateScheduleDrawer state={true} onClose={() => {}} /> */}
    </>
  );
};

export default AdmissionCalendar;
