import { Link } from "react-router-dom";
import Nav from "../layouts/Nav";
import { motion } from "framer-motion";
import Header from "../layouts/Header";

interface ToolOptionProps {
  title: string;
  description: string;
  path: string;
}

const ToolOptions: ToolOptionProps[] = [
  {
    title: "Applicants",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exnatus maxime distinctio. Nisi exercitationem",
    path: "/applicants",
  },

  {
    title: "Examinee",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exnatus maxime distinctio. Nisi exercitationem",
    path: "/examiniees",
  },

  {
    title: "Master List",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exnatus maxime distinctio. Nisi exercitationem",
    path: "/masterlist",
  },

  {
    title: "Users",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exnatus maxime distinctio. Nisi exercitationem",
    path: "/users",
  },
];

const Tools = () => {
  return (
    <div className=" grid grid-cols-[70px_auto] gap-4">
      <aside>
        <Nav />
      </aside>
      <div className="px-8 py-4">
        <Header.Layout title="Tools" />
        <main className="my-4 grid grid-cols-3 gap-4">
          {ToolOptions.map(({ title, description, path }: ToolOptionProps) => (
            <Link to={path}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer flex flex-col p-4 rounded-[5px] border border-gray-400">
                <h4>{title}</h4>
                <p>{description}</p>
              </motion.div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Tools;
