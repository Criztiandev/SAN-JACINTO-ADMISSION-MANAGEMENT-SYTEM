import { Dropdown, Button } from "../../components";
import FilterIcon from "../../assets/icons/Filter.svg";
import ApplicantIcon from "../../assets/icons/Applicants.svg";
import { MouseEvent } from "react";
interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

interface GradeFilterProps {
  onTitleUpdate: () => string;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FilterItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon, value: "" },
  { title: "Grade 7", icon: ApplicantIcon, value: "7" },
  { title: "Grade 8", icon: ApplicantIcon, value: "8" },
  { title: "Grade 9", icon: ApplicantIcon, value: "9" },
  { title: "Grade 10", icon: ApplicantIcon, value: "10" },
  { title: "Grade 11", icon: ApplicantIcon, value: "11" },
  { title: "Grade 12", icon: ApplicantIcon, value: "12" },
];
// columnSearch.yearLevel.value

const GradeFilter = ({ onTitleUpdate, onSelect }: GradeFilterProps) => {
  return (
    <Dropdown
      className="border z-50"
      style={{ width: "150px" }}
      as="button"
      type="outlined"
      title={onTitleUpdate()}
      icon={FilterIcon}>
      {FilterItems.map(items => (
        <Button
          key={items.title}
          type="ghost"
          dir="left"
          value={items.value}
          {...items}
          onClick={onSelect}
        />
      ))}
    </Dropdown>
  );
};

export default GradeFilter;
