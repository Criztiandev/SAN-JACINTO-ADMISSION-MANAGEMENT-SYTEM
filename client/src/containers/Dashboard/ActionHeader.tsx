import { SettingIcon, SignOutIcon } from "../../assets/icons";
import { IconButton } from "../../components";

interface ActionHeaderProps {
  onSettings: () => void;
  onLogout: () => void;
  loading: boolean;
}

const ActionHeader = ({ onSettings, onLogout, loading }: ActionHeaderProps) => {
  return (
    <>
      <IconButton icon={SettingIcon} onClick={onSettings} disabled={loading} />
      <IconButton icon={SignOutIcon} onClick={onLogout} disabled={loading} />
    </>
  );
};

export default ActionHeader;
