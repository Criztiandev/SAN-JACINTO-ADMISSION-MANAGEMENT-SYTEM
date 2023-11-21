/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Drawer from "../../components/Drawer";
import { useEffect } from "react";

interface ApplicantDrawerProps {
  state: string;
  refetch?: any;
  Component: any;
}

const DrawerWrapper = ({ state, refetch, Component }: ApplicantDrawerProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentID = searchParams.get("APID") || "";
  const currentState = searchParams.get("state");

  const handleClose = () => {
    navigate(`${pathname}`);
  };

  useEffect(() => {
    if (currentState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentState]);

  return (
    <>
      {currentState === state && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll h-[100vh]"
            width="600px"
            state={true}
            onClick={handleClose}>
            <Component APID={currentID} refetch={refetch} />
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default DrawerWrapper;
