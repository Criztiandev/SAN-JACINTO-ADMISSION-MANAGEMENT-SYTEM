import { Link } from "react-router-dom";
import { Dropdown } from "../components";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import { motion } from "framer-motion";
const ShortCut = () => {
  const shortcutItems = [
    {
      cover: ApplicantIcon,
      path: "/examiniees",
      title: "Examiniees",
    },

    {
      cover: ApplicantIcon,
      path: "/masterlist",
      title: "Master List",
    },
  ];
  return (
    <Dropdown className="flex flex-col p-2 w-[175px]">
      {shortcutItems.map(items => (
        <motion.div
          whileTap={{ scale: 0.8 }}
          className="hover:bg-blue-300 rounded-[5px]">
          <Link to={items.path} className="flex gap-2 p-2">
            <img src={items.cover} alt="Examiniees Icon" />
            {items.title}
          </Link>
        </motion.div>
      ))}
    </Dropdown>
  );
};

export default ShortCut;
