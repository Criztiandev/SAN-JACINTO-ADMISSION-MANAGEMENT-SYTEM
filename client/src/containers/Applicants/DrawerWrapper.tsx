/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Drawer from "../../components/Drawer";

interface ApplicantDrawerProps {
  state: string;
  Component: any;
}

const DrawerWrapper = ({ state, Component }: ApplicantDrawerProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentID = searchParams.get("APID");
  const currentState = searchParams.get("state");

  const handleClose = () => {
    navigate("/applicants");
  };

  return (
    <>
      {currentState === state && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll"
            width="600px"
            state={currentState === state}
            onClick={handleClose}>
            <Component APID={currentID} />
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default DrawerWrapper;
