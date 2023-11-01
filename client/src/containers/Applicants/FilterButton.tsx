import { useState } from "react";
import { Dropdown } from "../../components";

import FilterIcon from "../../assets/icons/Filter.svg";
import { GradeLevelTrack, yearLevels } from "../../helper/GradeLevel.Helper";
import { ApplicantIcon } from "../../assets/icons";
import { OptionItem } from "../../interface/Component.Type";
interface FilterButtonProps {
  title: string;
}
GradeLevelTrack;

const FilterButton = ({ title }: FilterButtonProps) => {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleUpdate = (current: string) => {
    if (current === "" || null) setCurrentTitle(title);
    return setCurrentTitle(current);
  };

  const GradeOptions: OptionItem[] = [
    { icon: ApplicantIcon, title: "Grade 7" },
    { icon: ApplicantIcon, title: "Grade 8" },
    { icon: ApplicantIcon, title: "Grade 9" },
    { icon: ApplicantIcon, title: "Grade 10" },
    { icon: ApplicantIcon, title: "Grade 11" },
    { icon: ApplicantIcon, title: "Grade 12" },
  ];

  return (
    <Dropdown
      as="button"
      type="outlined"
      title={currentTitle || title}
      icon={FilterIcon}
      className="p-4 min-w-[150px] flex flex-col gap-2"
      option={GradeOptions}
    />
  );
};

export default FilterButton;
