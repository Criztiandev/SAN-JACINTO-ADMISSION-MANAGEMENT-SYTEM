import Dropdown from "../../components/Dropdown";
import ApplicantIcon from "../../assets/icons/Applicant_Dark.svg";

interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

const MoreItems: ListItemProps[] = [
  { title: "Print", icon: ApplicantIcon },
  { title: "Export", icon: ApplicantIcon },
];

const MoreOption = () => {
  return <Dropdown as="outlined" option={MoreItems} />;
};

export default MoreOption;
