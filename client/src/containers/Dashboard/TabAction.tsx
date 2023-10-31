import { GraphIcon, CalendarIcon, ApplicantIcon } from "../../assets/icons";
import GraphButton from "./TabButton";
import { MouseEvent } from "react";
const DashboardPanel = [
  { title: "Graph", icons: GraphIcon },
  { title: "Admission", icons: CalendarIcon },
  { title: "Applicant", icons: ApplicantIcon },
];

interface TabActionProps {
  selected: string;
  isPending: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TabAction = ({ selected, isPending, onSelect }: TabActionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
        {DashboardPanel.map(props => (
          <GraphButton
            key={props.title}
            {...props}
            selected={selected}
            pending={isPending}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TabAction;
