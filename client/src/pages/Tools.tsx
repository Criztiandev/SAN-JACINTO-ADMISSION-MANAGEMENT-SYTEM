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
      " This Panel provides a user-friendly interface to seamlessly review and manage incoming applications, ensuring an efficient and organized selection process.",
    path: "/applicants",
  },

  {
    title: "Examinee",
    description:
      "Navigate through exam-related details effortlessly in the Examinees Panel, offering a centralized hub for overseeing and managing all examinee information with ease.",
    path: "/examiniees",
  },

  {
    title: "Master List",
    description:
      "Enjoy the convenience of a centralized hub for comprehensive data management with the Master List Panel, facilitating quick and efficient retrieval of diverse information.",
    path: "/masterlist",
  },

  {
    title: "Users",
    description:
      "Simplify user management tasks with the Users Panel, providing a clear overview of all system users and enabling easy navigation through user-related functionalities.",
    path: "/users",
  },
  {
    title: "Batch",
    description:
      "Streamline batch management tasks with the Batch Panel, offering a concise and dedicated platform for effortless navigation and control over all batch-related information.",
    path: "/batch",
  },

  {
    title: "Annoucement",
    description:
      "This allowing you to create and manage important announcements, ensuring effective communication within the system. Keep all stakeholders updated with essential information",
    path: "/annoucement",
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
                className="cursor-pointer flex flex-col p-4 rounded-[5px] h-full border border-gray-400">
                <h4 className="mb-2">{title}</h4>
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
