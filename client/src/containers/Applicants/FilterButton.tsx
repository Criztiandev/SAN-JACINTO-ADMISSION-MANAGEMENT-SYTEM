import { useState, MouseEvent } from "react";
import { FilterButtonProps } from "../../interface/ApplicantPanel.Type";
import Skeleton from "react-loading-skeleton";
import Dropdown from "../../components/Dropdown";

const FilterButton = ({
  as = "outlined",
  title,
  option,
  onToggle,
  ...props
}: FilterButtonProps) => {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const value: string = (e.currentTarget as HTMLButtonElement).value;
    if (value === "" || value === null) setCurrentTitle(title);
    else setCurrentTitle(value);
  };

  return (
    <>
      {props.disabled ? (
        <Skeleton height={45} width={145} />
      ) : (
        <Dropdown
          as={as}
          type="button"
          dir="left"
          title={currentTitle || title}
          className="p-4 min-w-[150px] flex flex-col gap-2"
          onClick={(e) => {
            onToggle && onToggle(e);
            handleTitleUpdate(e);
          }}
          option={option}
          {...props}
        />
      )}
    </>
  );
};

export default FilterButton;
