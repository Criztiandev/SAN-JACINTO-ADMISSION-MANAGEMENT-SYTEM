import { AnimatePresence } from "framer-motion";
import { Drawer } from "../../components";

interface CreateDrawerProps {
  state: boolean;
  onClick: () => void;
}

const CreateDrawer = ({ state, onClick }: CreateDrawerProps) => {
  return (
    <AnimatePresence mode="wait">
      <Drawer state={state} onClick={onClick}></Drawer>
    </AnimatePresence>
  );
};

export default CreateDrawer;
