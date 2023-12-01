/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import exportFromJSON from "export-from-json";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import Typography from "../../components/Typography";
import { useState, MouseEvent } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import FilterButton from "../Applicants/FilterButton";
import EmptyCard from "../Common/EmptyCard";
import Files from "../../assets/icons/Form_fill.svg";
import CreateFile from "../../assets/icons/File_dock_add_fill.svg";
import FileIcon from "../../assets/icons/Batch.svg";
import DownloadIcon from "../../assets/icons/Download_circle_fill.svg";
import dayjs from "dayjs";
import Dropdown from "../../components/Dropdown";
import ApplicantList from "../../assets/icons/Status_list.svg";
import ApplicantIcon from "../../assets/icons/Applicant_Dark.svg";

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
  const [preferedLevel, setPreferedLevel] = useState("Track");
  const [finalData, setFinalData] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const { data, isLoading, isError } = useFetch({
    route: `/examiniees?status=scheduled`,
    key: [`examiniees-masterlist`],
  });

  const { data: formData, isLoading: isFormLoading } = useFetch({
    route: `/masterlist/examiniees?track=${preferedLevel}`,
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

  const handleSelectLevel = (e: MouseEvent<HTMLButtonElement>) => {
    const _current = e.currentTarget.value;
    const filteredTrack = data?.filter(
      (field: any) => field.track === _current && field?.schedule !== null
    );
    setPreferedLevel(e.currentTarget.value);
    setFinalData(filteredTrack);
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
              title="Lock Data"
              onClick={() => handleSelectFile("SF1")}
              disabled={isFormLoading}
              icon={Files}
            />
          </div>

          <div className="flex gap-4">
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

            <Dropdown
              type="button"
              as={preferedLevel === "Track" ? "outlined" : "contained"}
              icon={preferedLevel === "Track" ? ApplicantIcon : ApplicantList}
              title={preferedLevel || "Grade level"}
              className="p-4 flex gap-2 flex-col w-[120px]"
              onClick={handleSelectLevel}
              option={[
                { title: "SPJ", icon: "" },
                { title: "SPE", icon: "" },
                { title: "STEM", icon: "" },
              ]}
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl mb-4">Examiniees</h5>
          </div>
          <div className="flex flex-col gap-4">
            {finalData?.length <= 0 ? (
              <EmptyCard title="No Examiniee Data" />
            ) : (
              <>
                {finalData?.map((examinee: any) => {
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
                          <span className="font-semibold">
                            📅 Registered At:{" "}
                          </span>
                          {`${dayjs(examinee?.regitrationDate).format(
                            "MMM DD"
                          )}, ${dayjs().year()}`}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewExaminiees;
