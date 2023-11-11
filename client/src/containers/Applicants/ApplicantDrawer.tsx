/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Drawer } from "../../components";

interface ApplicantDrawerProps {
  pref: string;
  Component: any;
}

const ApplicantDrawer = ({ pref, Component }: ApplicantDrawerProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentID = searchParams.get("APID");
  const currentState = searchParams.get("state");

  const handleClose = () => {
    navigate("/applicants");
  };

  return (
    <>
      {currentState === pref && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll"
            width="600px"
            state={true}
            onClick={handleClose}>
            <Component APID={currentID} />
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default ApplicantDrawer;
