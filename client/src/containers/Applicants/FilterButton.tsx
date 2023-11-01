import { useState, MouseEvent } from "react";
import { Dropdown } from "../../components";

import { GradeLevelTrack } from "../../helper/GradeLevel.Helper";
import { ApplicantIcon } from "../../assets/icons";
import { OptionItem } from "../../interface/Component.Type";
interface FilterButtonProps {
  title: string;
  icon: string;
  option: OptionItem[];
}
GradeLevelTrack;

const FilterButton = ({ title, option, ...props }: FilterButtonProps) => {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    if (value === "" || null) setCurrentTitle(title);
    return setCurrentTitle(value);
  };

  return (
    <Dropdown
      as="outlined"
      type="button"
      dir="left"
      title={currentTitle || title}
      className="p-4 min-w-[150px] flex flex-col gap-2"
      onClick={handleTitleUpdate}
      option={option}
      {...props}
    />
  );
};

export default FilterButton;
