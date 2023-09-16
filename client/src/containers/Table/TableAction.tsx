import IconButton from "../../components/IconButton";
import AcceptIcon from "../../assets/icons/Done_light.svg";
import SelectAllIcon from "../../assets/icons/Select_All.svg";
import CloseIcon from "../../assets/icons/Close_round_light.svg";
import MessageIcon from "../../assets/icons/Message_light.svg";
import { useTableContext } from "../../context/TableContext";

interface TableActionProps {
  close: () => void;
}

const TableAction = ({ close }: TableActionProps) => {
  const { table, handleAcceptApplicant, rowSelection } = useTableContext();
  const { getToggleAllRowsSelectedHandler } = table;

  const allSelectedApplicants = Object.keys(rowSelection).map(Number);

  return (
    <>
      <IconButton
        type="outlined"
        icon={AcceptIcon}
        onClick={() => handleAcceptApplicant(allSelectedApplicants)}
      />
      <IconButton type="outlined" icon={MessageIcon} />
      <IconButton
        type="outlined"
        icon={SelectAllIcon}
        onClick={getToggleAllRowsSelectedHandler()}
      />
      <IconButton type="outlined" icon={CloseIcon} onClick={close} />
    </>
  );
};

export default TableAction;
