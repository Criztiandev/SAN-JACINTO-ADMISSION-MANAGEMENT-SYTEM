import CalendarIcon from "../assets/icons/Calendar.svg";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

const MonthPicker = () => {
  const option: Intl.DateTimeFormatOptions = { month: "long" };

  // Get the current month
  const date = new Date();
  const currentMonth = date.toLocaleString(undefined, option);

  // Get the next month
  date.setMonth(date.getMonth() + 1);
  const nextMonth = date.toLocaleString(undefined, option);

  // Get the current Year
  const currentYear = date.getFullYear();

  const [selectedMonthPair, setSelectedMonthPair] = useState(
    `${currentMonth} - ${nextMonth} `
  );

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date();
    date.setMonth(index);
    return date.toLocaleDateString(undefined, option);
  });

  const monthPairs = Array.from({ length: 11 }).map((_, index) => ({
    prevMonth: months[index],
    lastMonth: months[index + 1],
  }));

  const handleMonthPair = (mothPair: string) => {
    setSelectedMonthPair(mothPair);
  };

  return (
    <Dropdown
      className="z-50"
      as="button"
      dir="left"
      title={`${selectedMonthPair}, ${currentYear}`}
      type="outlined"
      icon={CalendarIcon}>
      {monthPairs.map(month => (
        <li key={month.prevMonth}>
          <button
            className="w-full p-4 grid grid-cols-[auto_32px_auto] justify-center items-center border"
            onClick={() =>
              handleMonthPair(`${month.prevMonth} - ${month.lastMonth}`)
            }>
            <span>{month.prevMonth}</span>
            <span>-</span>
            <span>{month.lastMonth}</span>
          </button>
        </li>
      ))}
    </Dropdown>
  );
};

export default MonthPicker;
