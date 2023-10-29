import { Drawer } from "../../components";
import { ToggleDrawerProps } from "../../interface/Component.Type";

const SettingsDrawer = (props: ToggleDrawerProps) => {
  return (
    <Drawer
      className="overflow-scroll"
      width="600px"
      {...props}
      onClick={props.onClose}>
      hi
    </Drawer>
  );
};

export default SettingsDrawer;
