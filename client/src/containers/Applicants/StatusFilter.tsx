import { Dropdown, Button } from "../../components";
import FilterIcon from "../../assets/icons/Filter.svg";
import ApplicantIcon from "../../assets/icons/Applicants.svg";
import { MouseEvent } from "react";

interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

interface StatusFilterProps {
  onTitleUpdate?: () => string;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StatusItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon, value: "" },
  { title: "Pending", icon: ApplicantIcon, value: "Pending" },
  { title: "Hold", icon: ApplicantIcon, value: "Hold" },
];

const StatusFilter = ({ onTitleUpdate, onSelect }: StatusFilterProps) => {
  return (
    <Dropdown
      className="border z-50 w-[150px] p-2"
      as="button"
      type="outlined"
      title={onTitleUpdate()}
      icon={FilterIcon}>
      {StatusItems.map(items => (
        <div className="hover:bg-blue-300 rounded-[5px]">
          <Button
            key={items.title}
            type="ghost"
            dir="left"
            value={items.title}
            {...items}
            onClick={onSelect}
          />
        </div>
      ))}
    </Dropdown>
  );
};

export default StatusFilter;
