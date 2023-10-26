import { Dropdown, IconButton, Image } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import { motion } from "framer-motion";
interface ActionColumnProps {
  status: string;
  onEdit: () => void;
  onMessage: () => void;
  onHold: () => void;
  onDelete: () => void;
  onAccept?: () => void;
}

const ActionColumn = ({
  status,
  onEdit,
  onMessage,
  onDelete,
  onHold,
  onAccept,
}: ActionColumnProps) => {
  const DropdowmItems = [
    { icon: MessageIcon, title: "Message", onClick: onMessage },
    { icon: MessageIcon, title: status, onClick: onHold },
    { icon: DeleteIcon, title: "Delete", onClick: onDelete },
  ];

  return (
    <span className="flex gap-4">
      <IconButton type="outlined" icon={AcceptIcon} onClick={onAccept} />
      <IconButton type="outlined" icon={EditIcon} onClick={onEdit} />
      <Dropdown className=" w-[9.5rem] py-2 px-4 flex flex-col">
        {DropdowmItems.map(({ title, icon, onClick }) => (
          <motion.button
            whileTap={{ scale: 0.8 }}
            key={title}
            onClick={onClick}
            className="flex w-full h-full py-2 items-center gap-2">
            <Image src={icon} alt="Message_Icon" />
            <span>{title}</span>
          </motion.button>
        ))}
      </Dropdown>
    </span>
  );
};

export default ActionColumn;
