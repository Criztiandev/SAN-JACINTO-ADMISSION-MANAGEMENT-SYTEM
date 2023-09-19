import IconButton from "../../components/IconButton";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import EditIcon from "../../assets/icons/Edit_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";
import Archive from "../../assets/icons/Arhive_light.svg";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useTableContext } from "../../context/TableContext";

interface ActionProps {
  disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
}

const ActionColumn = ({ row, disabled }: ActionProps) => {
  const { handleAcceptApplicant } = useTableContext();
  const handleAccept = () => {
    handleAcceptApplicant(row.id);
  };

  return (
    <span className="flex gap-4">
      <IconButton
        disabled={disabled}
        icon={AcceptIcon}
        onClick={handleAccept}
        type="ghost"
      />
      <IconButton disabled={disabled} icon={EditIcon} type="ghost" />
      <Dropdown disabled={disabled} as="icon" type={"ghost"} className="z-20">
        <Button
          dir="left"
          icon={MessageIcon}
          title="Message"
          type="ghost"
          name="message"
        />
        <Button
          dir="left"
          icon={DeleteIcon}
          title="Delete"
          type="ghost"
          name="delete"
        />
        <Button
          dir="left"
          icon={Archive}
          title="Archive"
          type="ghost"
          name="archive"
        />
      </Dropdown>
    </span>
  );
};
export default ActionColumn;
