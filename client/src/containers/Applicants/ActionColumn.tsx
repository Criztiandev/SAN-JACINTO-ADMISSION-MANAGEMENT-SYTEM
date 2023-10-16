import { Dropdown, IconButton, Image } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import { motion } from "framer-motion";
interface ActionColumnProps {
  onEdit: () => void;
  onMessage: () => void;
  onHold: () => void;
  onDelete: () => void;
}

const ActionColumn = ({
  onEdit,
  onMessage,
  onDelete,
  onHold,
}: ActionColumnProps) => {
  const DropdowmItems = [
    {
      icon: MessageIcon,
      title: "Message",
      onClick: onMessage,
    },

    {
      icon: MessageIcon,
      title: "Hold",
      onClick: onHold,
    },

    {
      icon: DeleteIcon,
      title: "Delete",
      onclick: onDelete,
    },
  ];

  return (
    <span className="flex gap-4">
      <IconButton type="outlined" icon={AcceptIcon} />
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
