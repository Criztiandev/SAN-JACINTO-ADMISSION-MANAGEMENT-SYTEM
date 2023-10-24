/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from "formik";
import { options } from "../../utils/Date.utils";
import { useEffect } from "react";
import { Input } from "../../components";
import { InputProps } from "../../interface/FormInterface";
import { SelectedSlotProps } from "../../interface/Schedule.Types";

interface DateInputProps extends InputProps {
  disabled?: boolean | string;
}

const DateSelect = ({ start, end }: SelectedSlotProps) => {
  const { setFieldValue } = useFormikContext();

  const startDateValue = start.toLocaleDateString(undefined, options);
  const endDateValue = end.toLocaleDateString(undefined, options);

  const dateInputList: DateInputProps[] = [
    {
      label: "Date Start",
      name: "date.start",
      value: startDateValue,
      disabled: true,
    },
    {
      label: "Date End",
      name: "date.end",
      value: endDateValue,
      disabled: true,
    },
    { type: "time", label: "Time Start", name: "time.start" },
    { type: "time", label: "Time End", name: "time.end" },
  ];

  useEffect(() => {
    if (start) setFieldValue("date.start", start);
    if (end) setFieldValue("date.end", end);

    return () => {
      setFieldValue("date.start", "");
      setFieldValue("date.end", "");
    };
  }, [start, end]);

  return (
    <section className="grid grid-cols-2 gap-4">
      {dateInputList.map(inputs => (
        <Input key={inputs.label} {...inputs} />
      ))}
    </section>
  );
};

export default DateSelect;
