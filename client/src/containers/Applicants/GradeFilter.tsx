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
  title: string;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FilterItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Grade 7", icon: ApplicantIcon },
  { title: "Grade 8", icon: ApplicantIcon },
  { title: "Grade 9", icon: ApplicantIcon },
  { title: "Grade 10", icon: ApplicantIcon },
  { title: "Grade 11", icon: ApplicantIcon },
  { title: "Grade 12", icon: ApplicantIcon },
];
// columnSearch.yearLevel.value

const GradeFilter = ({ title, onSelect }: GradeFilterProps) => {
  return (
    <Dropdown
      className="border z-50 p-2"
      style={{ width: "150px" }}
      as="button"
      type="outlined"
      title={title}
      icon={FilterIcon}>
      {FilterItems.map(items => (
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

export default GradeFilter;
