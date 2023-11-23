/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import exportFromJSON from "export-from-json";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import useURL from "../../hooks/useURL";
import Typography from "../../components/Typography";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import FilterButton from "../Applicants/FilterButton";
import IconButton from "../../components/IconButton";
import DeleteIcon from "../../assets/icons/Delete.svg";
import useCustomMutation from "../../hooks/useCustomMutation";
import EmptyCard from "../Common/EmptyCard";
import Files from "../../assets/icons/Form_fill.svg";
import CreateFile from "../../assets/icons/File_dock_add_fill.svg";
import FileIcon from "../../assets/icons/Batch.svg";
import DownloadIcon from "../../assets/icons/Download_circle_fill.svg";
import dayjs from "dayjs";

const getCurrentDateTime = (): { currentDate: string; currentTime: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");

  const currentDate = `${year}-${month}-${day}`;
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return { currentDate, currentTime };
};

const ViewExaminiees = () => {
  const [isRefetch, setIsRefetch] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/examiniees`,
    key: [`examiniees-masterlist`],
  });

  const { data: formData, isLoading: isFormLoading } = useFetch({
    route: `/masterlist/examiniees`,
    key: ["examiniees-masterlist-data"],
    overrideFn: () => setIsRefetch(false),
    option: {
      enabled: isRefetch,
    },
  });

  const handleSelectFile = (file: string) => {
    setSelectedForm(file);
    setIsRefetch(true);
  };

  const handleDownload = (format: string, file: string) => {
    if (!format || !file) {
      toast.error("Please provide both format and file type to proceed.");
      return;
    }

    const { currentDate, currentTime } = getCurrentDateTime(); // Format: YYYY-MM-DD
    const formPrefix = file.startsWith("Form") ? "Application Forms" : "SF1";
    const fileName = `${formPrefix}-${currentDate}-${currentTime}-${format.toUpperCase()}`;

    // Get the current time
    const exportType =
      format === "CSV" ? exportFromJSON.types.csv : exportFromJSON.types.xls;
    exportFromJSON({ data: formData, fileName, exportType });
    toast.success("Exported Successfully");
  };

  if (isLoading || isError)
    return (
      <div>
        <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
          <div>
            <h1>Examinees </h1>
            <span></span>
          </div>
        </header>

        <main>
          <EmptyCard title="Student Not Available" />
        </main>
      </div>
    );

  return (
    <>
      <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
        <div>
          <h1>Examinees List</h1>
          <span></span>
        </div>

        <div className="flex gap-4">
          <Button
            title="Download"
            icon={DownloadIcon}
            onClick={() => handleDownload(selectedFormat, selectedForm)}
          />
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button
              as={selectedForm === "SF1" ? "contained" : "outlined"}
              title="Examniee Data"
              onClick={() => handleSelectFile("SF1")}
              disabled={isFormLoading}
              icon={Files}
            />
          </div>

          <FilterButton
            title="Format"
            icon={CreateFile}
            as={selectedFormat ? "contained" : "outlined"}
            onToggle={(e) => {
              setSelectedFormat(e.currentTarget.value);
            }}
            option={[
              { title: "CSV", icon: FileIcon },
              { title: "Excel", icon: FileIcon },
            ]}
          />
        </div>

        <div className="mt-8">
          <h5 className="text-xl mb-4">Examiniees</h5>
          <div className="flex flex-col gap-4">
            {data?.map((examinee: any) => {
              return (
                <motion.div
                  key={examinee?.fullName}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-400  p-4 rounded-[5px] ">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-3">
                    <Typography as="h4">{examinee?.fullName}</Typography>

                    <div className="capitalize px-4 py-1  rounded-full bg-green-400">
                      {examinee?.track}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <span>
                      📄 <span className="font-semibold">Permit ID:</span>{" "}
                      {examinee?.permitID}
                    </span>
                    <span>
                      <span className="font-semibold">📧 Email:</span> @
                      {examinee?.email.split("@")[0]}
                    </span>
                    <span className="capitalize">
                      <span className="font-semibold">📞 Contact:</span> +63
                      {examinee?.contact}
                    </span>
                    <span>
                      <span className="font-semibold">⌚ Schedule:</span>{" "}
                      {examinee?.schedule}
                    </span>
                    <span>
                      <span className="font-semibold">📅 Registered At: </span>
                      {`${dayjs(examinee?.regitrationDate).format(
                        "MMM DD"
                      )}, ${dayjs().year()}`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            {/* {data?.map((students: any) => {
              const { lastName, firstName, middleName, suffix } =
                students.personalDetails;
              return (
                <motion.div
                  key={firstName}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-400  p-4 rounded-[5px] ">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-3">
                    <Typography as="h4">
                      {lastName}, {firstName} {middleName[0]} {suffix}
                    </Typography>

                    <div className="capitalize px-4 py-1  rounded-full bg-green-400">
                      {students.studentDetails?.track}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <span>LRN : {students?.studentDetails?.LRN}</span>
                    <span>
                      Email: @{students?.personalDetails?.email.split("@")[0]}
                    </span>
                    <span className="capitalize">
                      Gender: {students?.personalDetails?.gender}
                    </span>
                    <span>
                      General Average : {students?.gradeDetails?.generalAve}%
                    </span>
                    <span>
                      School Year : {students?.studentDetails?.schoolYear}
                    </span>
                  </div>
                </motion.div>
              );
            })} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewExaminiees;
