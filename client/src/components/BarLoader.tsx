import { motion } from "framer-motion";
import { BarVariant } from "../animations/Loader.Variant";

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1">
      <motion.div variants={BarVariant} className="h-12 w-2 bg-white" />
      <motion.div variants={BarVariant} className="h-12 w-2 bg-white" />
      <motion.div variants={BarVariant} className="h-12 w-2 bg-white" />
      <motion.div variants={BarVariant} className="h-12 w-2 bg-white" />
      <motion.div variants={BarVariant} className="h-12 w-2 bg-white" />
    </motion.div>
  );
};

export default BarLoader;
