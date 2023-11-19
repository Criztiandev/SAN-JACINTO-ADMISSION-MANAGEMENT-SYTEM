/* eslint-disable @typescript-eslint/no-explicit-any */
import Dropdown from "../../components/Dropdown";
import IconButton from "../../components/IconButton";

import EditIcon from "../../assets/icons/Edit_light.svg";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";
import ArchieveIcon from "../../assets/icons/Arhive_light.svg";
import KebbabIcon from "../../assets/icons/Kebbab.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ActionColumnProps {
  data: any;
  onAction: (UID: string, value: string) => void;
}

const ApplicantActionColumn = ({ data, onAction }: ActionColumnProps) => {
  const [status, setStatus] = useState("archieve");
  const { _id } = data;

  const navigate = useNavigate();

  // create a hook for this shit
  const handleEdit = () => {
    navigate(`/applicants?APID=${_id}&state=edit`);
  };

  const handleMessage = () => {
    navigate(`/applicants?APID=${_id}&state=message`);
  };

  const handleHold = () => {
    onAction(_id, status);
    setStatus((prev) => (prev === "archieve" ? "pending" : "archieve"));
  };

  const DropdowmItems = [
    {
      icon: MessageIcon,
      title: "Message",
      onClick: handleMessage,
    },
    {
      icon: ArchieveIcon,
      title: status[0].toUpperCase() + status.slice(1),
      onClick: handleHold,
    },
  ];

  return (
    <span className="flex gap-4">
      <IconButton
        as="outlined"
        icon={AcceptIcon}
        onClick={() => onAction(_id, "accept")}
      />
      <IconButton as="outlined" icon={EditIcon} onClick={handleEdit} />
      <Dropdown
        icon={KebbabIcon}
        as="outlined"
        className=" w-[9.5rem] py-2 px-4 flex flex-col"
        option={DropdowmItems}
      />
    </span>
  );
};

export default ApplicantActionColumn;
