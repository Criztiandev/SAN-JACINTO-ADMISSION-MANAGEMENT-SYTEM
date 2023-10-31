import { motion } from "framer-motion";
import { BarVariant } from "../animations/Loader.Variant";

interface BarLoaderProps {
  size?: number;
  color?: string;
}

const BarLoader = ({ color }: BarLoaderProps) => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1">
      <motion.div
        variants={BarVariant}
        className={`h-12 w-2 ${color ? color : "bg-white"}`}
      />
      <motion.div
        variants={BarVariant}
        className={`h-12 w-2 ${color ? color : "bg-white"}`}
      />
      <motion.div
        variants={BarVariant}
        className={`h-12 w-2 ${color ? color : "bg-white"}`}
      />
      <motion.div
        variants={BarVariant}
        className={`h-12 w-2 ${color ? color : "bg-white"}`}
      />
      <motion.div
        variants={BarVariant}
        className={`h-12 w-2 ${color ? color : "bg-white"}`}
      />
    </motion.div>
  );
};

export default BarLoader;
