import { Dropdown, Button } from "../../components";
import FilterIcon from "../../assets/icons/Filter.svg";
import { ApplicantIcon } from "../../assets/icons";
import { MouseEvent, useState } from "react";

interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

interface StatusFilterProps {
  title: string;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StatusItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon, value: "" },
  { title: "Pending", icon: ApplicantIcon, value: "Pending" },
  { title: "Hold", icon: ApplicantIcon, value: "Hold" },
];

const StatusFilter = ({ title, onSelect }: StatusFilterProps) => {
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  const handleTitleUpdate = (_title: string) => {
    console.log(_title);
    if (_title === "") return setCurrentTitle(title);
    setCurrentTitle(_title);
  };

  return (
    <Dropdown
      className="border z-50 w-[150px] p-2"
      as="button"
      type="outlined"
      title={currentTitle || "Filter"}
      icon={FilterIcon}>
      {StatusItems.map(items => (
        <div key={items.title} className="hover:bg-blue-300 rounded-[5px]">
          <Button
            key={items.title}
            type="ghost"
            dir="left"
            value={items.title}
            {...items}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              onSelect(e);
              handleTitleUpdate(e.currentTarget.value);
            }}
          />
        </div>
      ))}
    </Dropdown>
  );
};

export default StatusFilter;
