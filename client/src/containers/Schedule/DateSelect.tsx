import { useFormikContext } from "formik";
import { options } from "../../utils/Date.utils";
import { useEffect } from "react";
import { Input } from "../../components";
import { Event } from "../../interface/Date.Type";
import { InputProps } from "../../interface/FormInterface";

interface DateSelectProps {
  selected: Event;
}

interface DateInputProps extends InputProps {
  disabled?: boolean | string;
}

const DateSelect = ({ selected }: DateSelectProps) => {
  const { start, end } = selected;

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
    if (selected && selected.start) {
      setFieldValue("date.start", selected.start);
    }

    if (selected && selected.end) {
      setFieldValue("date.end", selected.end);
    }
  }, [selected]);

  return (
    <section className="grid grid-cols-2 gap-4">
      {dateInputList.map(inputs => (
        <Input key={inputs.label} {...inputs} />
      ))}
    </section>
  );
};

export default DateSelect;
