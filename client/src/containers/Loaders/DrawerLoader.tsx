import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
const DrawerLoader = () => {
  useEffect(() => {
    toast.info("Pending");

    return () => {
      toast.success("Load Succesfully");
    };
  }, []);

  return (
    <motion.div
      className={` fixed inset-0 back-drop w-full h-full bg-[#00000080] z-20 flex justify-center items-center`}></motion.div>
  );
};

export default DrawerLoader;
