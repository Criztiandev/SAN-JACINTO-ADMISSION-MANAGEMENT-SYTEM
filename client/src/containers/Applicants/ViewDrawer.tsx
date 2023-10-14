import { AnimatePresence } from "framer-motion";
import { Drawer } from "../../components";

interface ViewDrawerProps {
  state: boolean;
  onClick: () => void;
}

const ViewDrawer = ({ state, onClick }: ViewDrawerProps) => {
  return (
    <AnimatePresence mode="wait">
      <Drawer state={state} onClick={onClick}></Drawer>
    </AnimatePresence>
  );
};

export default ViewDrawer;
