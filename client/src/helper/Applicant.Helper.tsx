/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterButton } from "../containers/Applicants";

import { Button } from "../components";

import { OptionItem } from "../interface/Component.Type";
import { useDrawer } from "../hooks";
import {
  ApplicantIcon,
  FilterIcon,
  CreateApplicantIcon,
} from "../assets/icons";

export const PersoanlDetailsNameInput = [
  { name: "personalDetails.lastName" },
  { name: "personalDetails.firstName" },
  { name: "personalDetails.middleName" },
  { name: "personalDetails.suffix" },
];

export const GradeOptions: OptionItem[] = [
  { icon: ApplicantIcon, title: "Grade 7" },
  { icon: ApplicantIcon, title: "Grade 8" },
  { icon: ApplicantIcon, title: "Grade 9" },
  { icon: ApplicantIcon, title: "Grade 10" },
  { icon: ApplicantIcon, title: "Grade 11" },
  { icon: ApplicantIcon, title: "Grade 12" },
];

export const StatusItems: OptionItem[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Pending", icon: ApplicantIcon },
  { title: "Hold", icon: ApplicantIcon },
];

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
        <FilterButton icon={FilterIcon} disabled={loading} {...props} />
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
