import { useState, MouseEvent } from "react";
import { FilterButtonProps } from "../../interface/ApplicantPanel.Type";
import Skeleton from "react-loading-skeleton";
import Dropdown from "../../components/Dropdown";

const FilterButton = ({ title, option, ...props }: FilterButtonProps) => {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    if (value === "" || null) setCurrentTitle(title);
    return setCurrentTitle(value);
  };

  return (
    <>
      {props.disabled ? (
        <Skeleton height={45} width={145} />
      ) : (
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
      )}
    </>
  );
};

export default FilterButton;
