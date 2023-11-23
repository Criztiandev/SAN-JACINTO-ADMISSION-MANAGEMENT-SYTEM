import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import FetchLoader from "../containers/General/FetchLoader";
import ViewExaminiees from "../containers/Masterlist/ViewExaminiees";
import ViewLevelList from "../containers/Masterlist/ViewLevelList";
import useFetch from "../hooks/useFetch";
import useURL from "../hooks/useURL";
import BaseLayout from "../layouts/BaseLayout";

import { motion } from "framer-motion";
const MasterList = () => {
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: "/masterlist/stats",
    key: ["masterlist"],
  });

  const handleToggleExaminies = () => {
    updateURL(`state=examinees`);
  };

  const handleToggleList = (level: string) => {
    updateURL(`state=view&filter=${level}`);
  };

  if (isLoading || isError) return <FetchLoader />;

  return (
    <>
      <BaseLayout
        title="Master List"
        actions={<div className="flex gap-4"></div>}
        free>
        <div className="grid grid-cols-4 gap-4">
          {data?.map(({ title, count }: { title: string; count: number }) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              className="relative  border border-gray-400 rounded-[10px] overflow-hidden select-none min-h-[320px]"
              onClick={() => {
                if (title === "Examinees") {
                  handleToggleExaminies();
                  return;
                }
                handleToggleList(title?.split(" ")[1]);
              }}>
              <div className="relative bg-coverImage bg-center h-[120px]">
                <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 font-medium rounded-full border w-[64px] h-[64px] flex justify-center items-center bg-green-300">
                  <span className="text-[32px] select-none">{count}</span>
                </span>
              </div>

              {/* Details */}
              <div className="p-4 text-center my-4">
                <div className="mb-4">
                  <h4 className="font-bold mt-4 mb-2">{title}</h4>
                  <span className="text-gray-500"></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </BaseLayout>

      <DrawerWrapper state="view" Component={ViewLevelList} />
      <DrawerWrapper state="examinees" Component={ViewExaminiees} />
    </>
  );
};

export default MasterList;
