import { Dropdown, Button } from "../../components";
import ApplicantIcon from "../../assets/icons/Applicants.svg";

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
  return (
    <Dropdown type="outlined">
      {MoreItems.map(items => (
        <Button key={items.title} type="ghost" dir="left" {...items} />
      ))}
    </Dropdown>
  );
};

export default MoreOption;
