/* eslint-disable @typescript-eslint/no-explicit-any */

//Hooks
import useDrawer from "../hooks/useDrawer";

// Types

// Icons
import FilterIcon from "../assets/icons/Filter.svg";
import CreateApplicantIcon from "../assets/icons/Create_Applicant.svg";

// Buttons
import Button from "../components/Button";
import FilterButton from "../containers/Applicants/FilterButton";
import { GradeOptions, StatusItems } from "../data/Applicant.Data";

// eslint-disable-next-line react-refresh/only-export-components
export const useDrawerOptions = () => {
  return {
    viewToggle: useDrawer(),
    createToggle: useDrawer(),
    updateToggle: useDrawer(),
    deleteToggle: useDrawer(),
    messageToggle: useDrawer(),
  };
};

export const RenderFilterButton = ({ loading }: { loading: boolean }) => {
  const FilterButtonsOption = [
    { title: "Grade", option: GradeOptions },
    { title: "Status", option: StatusItems },
  ];

  return (
    <div className="flex gap-4">
      {FilterButtonsOption.map((props) => (
        <FilterButton
          key={props.title}
          icon={FilterIcon}
          disabled={loading}
          {...props}
        />
      ))}
    </div>
  );
};

export const RenderCreateButton = ({
  toggle,
  loading,
}: {
  toggle: () => void;
  loading: boolean;
}) => {
  return (
    <Button
      type="button"
      dir="left"
      title="Create"
      icon={CreateApplicantIcon}
      onClick={toggle}
      disabled={loading}
    />
  );
};
