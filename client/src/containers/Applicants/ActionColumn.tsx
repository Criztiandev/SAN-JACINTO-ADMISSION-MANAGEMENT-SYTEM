import { Button, Dropdown, IconButton } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";

interface ActionColumnProps {
  onSelect: () => void;
  onMessage: () => void;
}

const ActionColumn = ({ onSelect, onMessage }: ActionColumnProps) => {
  return (
    <span className="flex gap-4">
      <IconButton type="outlined" icon={AcceptIcon} />
      <IconButton type="outlined" icon={EditIcon} onClick={onSelect} />
      <Dropdown>
        <Button
          title="Message"
          type="ghost"
          icon={MessageIcon}
          dir="left"
          onClick={onMessage}
        />

        <Button title="Message" type="ghost" icon={MessageIcon} dir="left" />

        <Button title="Message" type="ghost" icon={MessageIcon} dir="left" />
      </Dropdown>
    </span>
  );
};

export default ActionColumn;
