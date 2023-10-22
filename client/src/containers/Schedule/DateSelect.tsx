import { useFormikContext } from "formik";
import { options } from "../../helper/dateHelper";
import { useEffect } from "react";
import { Input } from "../../components";
import { InputInterface } from "../../interface/Component.Type";
import { Event } from "../../interface/Date.Type";

interface DateSelectProps {
  selected: Event;
}

interface DateInputProps extends InputInterface {
  disabled?: boolean | string;
}

const DateSelect = ({ selected }: DateSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const startDateValue = selected.start.toLocaleDateString(undefined, options);
  const endDateValue = selected.end.toLocaleDateString(undefined, options);

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
  }, [selected, setFieldValue]);

  return (
    <section className="grid grid-cols-2 gap-4">
      {dateInputList.map(inputs => (
        <Input key={inputs.label} {...inputs} />
      ))}
    </section>
  );
};

export default DateSelect;
