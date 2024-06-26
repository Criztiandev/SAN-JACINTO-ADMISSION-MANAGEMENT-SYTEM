import GraphButton from "./TabButton";
import CalendarIcon from "../../assets/icons/Calendar_Dark.svg";
import ApplicantIcon from "../../assets/icons/Applicant_Dark.svg";
import { MouseEvent } from "react";

const DashboardPanel = [
  { title: "Admission", icons: CalendarIcon },
  { title: "Applicant", icons: ApplicantIcon },
];

interface TabActionProps {
  selected: string;
  pending: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TabAction = ({ selected, pending, onSelect }: TabActionProps) => {
  return (
    <div className="flex gap-4  justify-end">
      {DashboardPanel.map((props) => (
        <GraphButton
          key={props.title}
          {...props}
          selected={selected}
          pending={pending}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default TabAction;
