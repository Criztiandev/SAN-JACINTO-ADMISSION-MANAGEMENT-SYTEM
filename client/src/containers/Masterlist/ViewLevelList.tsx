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

const ViewLevelList = () => {
  const [isRefetch, setIsRefetch] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const { queryParams, updateURL } = useURL();
  const level = queryParams.get("filter");

  const { data, isLoading, isError } = useFetch({
    route: `/masterlist?level=${level}`,
    key: [`masterlist-${level}`],
  });

  const { data: formData, isLoading: isFormLoading } = useFetch({
    route: `/masterlist/${selectedForm}?level=${level}`,
    key: ["temp"],
    overrideFn: () => setIsRefetch(false),
    option: {
      enabled: isRefetch,
    },
  });

  const { mutate } = useCustomMutation({
    route: `/masterlist?level=${level}`,
    overrideFn: () => {
      updateURL("/masterlist");
      toast.success("Master List Deleted Successfully");
    },
    type: "delete",
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

  const handleFlush = () => {
    mutate({});
  };

  if (isLoading || isError)
    return (
      <div>
        <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
          <div>
            <h1>Grade {level} List</h1>
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
          <h1>Grade {level} List</h1>
          <span></span>
        </div>

        <div>
          <IconButton as="outlined" icon={DeleteIcon} onClick={handleFlush} />
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button
              as={selectedForm === "SF1" ? "contained" : "outlined"}
              title="SF1"
              onClick={() => handleSelectFile("SF1")}
              disabled={isFormLoading}
            />
            <Button
              title="Form"
              as={selectedForm === "Form" ? "contained" : "outlined"}
              onClick={() => handleSelectFile("Form")}
              disabled={isFormLoading}
            />
          </div>

          <FilterButton
            title="Format"
            icon=""
            as={selectedFormat ? "contained" : "outlined"}
            onToggle={(e) => {
              setSelectedFormat(e.currentTarget.value);
            }}
            option={[
              { title: "CSV", icon: "" },
              { title: "Excel", icon: "" },
            ]}
          />
        </div>

        <div className="mt-8">
          <h5 className="text-xl mb-4">Applicants</h5>
          <div className="flex flex-col gap-4">
            {data?.map((students: any) => {
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
            })}
          </div>
        </div>

        <div className="sticky bottom-3 right-0 flex justify-end">
          <Button
            title="Download"
            className=""
            onClick={() => handleDownload(selectedFormat, selectedForm)}
          />
        </div>
      </main>
    </>
  );
};

export default ViewLevelList;
