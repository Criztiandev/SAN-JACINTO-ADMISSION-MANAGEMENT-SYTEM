import { ReactNode } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { BaseProps } from "../interface/Common.Types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";

interface navigationOption {
  path?: string;
  title: string;
  icon?: string;
  onClick?: () => void;
}

interface GridLayoutProps extends BaseProps {
  title: string;
  subtitle?: string;
  header?: ReactNode;
  navigation?: Array<navigationOption>;
}

const GridLayout = ({
  title,
  subtitle,
  header,
  navigation,
  children,
}: GridLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className=" grid grid-cols-[70px_1fr] overflow-x-hidden">
      <aside className="">
        <Nav />
      </aside>

      <div className="grid grid-cols-[200px_1fr] gap-2">
        <div className=" border-r-gray-400 border flex flex-col gap-4 p-4 justify-center">
          {navigation?.map((nav) => (
            <motion.div
              key={nav.title}
              className="cursor-pointer flex gap-3"
              onClick={() => navigate(`${nav?.path}`)}>
              <Avatar src={nav.icon || ""} />
              {nav.title}
            </motion.div>
          ))}
        </div>

        <div className="p-4 w-full h-[90%] overflow-auto">
          <Header.Layout title={title} subtitle={subtitle}>
            {header}
          </Header.Layout>

          {/* // Main Component */}
          <main className="h-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default GridLayout;
