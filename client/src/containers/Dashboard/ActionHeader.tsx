import { SettingIcon, SignOutIcon } from "../../assets/icons";
import { IconButton } from "../../components";

interface ActionHeaderProps {
  onSettings: () => void;
  onLogout: () => void;
}

const ActionHeader = ({ onSettings, onLogout }: ActionHeaderProps) => {
  return (
    <>
      <IconButton icon={SettingIcon} onClick={onSettings} />
      <IconButton icon={SignOutIcon} onClick={onLogout} />
    </>
  );
};

export default ActionHeader;
