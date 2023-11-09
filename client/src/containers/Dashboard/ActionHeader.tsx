import { SettingIcon, SignOutIcon } from "../../assets/icons";
import { IconButton } from "../../components";

interface ActionHeaderProps {
  onSettings: () => void;
  onLogout: () => void;
  loading: boolean;
}

const ActionHeader = ({ onSettings, onLogout }: ActionHeaderProps) => {
  return (
    <>
      <IconButton icon={SettingIcon} onClick={onSettings} disabled />
      <IconButton icon={SignOutIcon} onClick={onLogout} disabled />
    </>
  );
};

export default ActionHeader;
