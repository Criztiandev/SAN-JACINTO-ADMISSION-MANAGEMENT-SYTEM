import { ChangeEvent, useState } from "react";
import Dropdown from "../../components/Dropdown";
import IconButton from "../../components/IconButton";
import useFetch from "../../hooks/useFetch";
import useURL from "../../hooks/useURL";
import FetchLoader from "../General/FetchLoader";
import Typography from "../../components/Typography";

const ViewLevelList = () => {
  const [search, setSearch] = useState("");
  const { queryParams } = useURL();
  const level = queryParams.get("filter");

  const { data, isLoading, isError } = useFetch({
    route: `/masterlist?level=${level}`,
    key: [`masterlist-${level}`],
  });

  const handleDownload = () => {
    alert("Download");
  };

  if (isLoading || isError) return <FetchLoader />;

  return (
    <>
      <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
        <div>
          <h1>Grade {level} List</h1>
          <span></span>
        </div>

        <div className="flex gap-4">
          <IconButton icon={""} as="outlined" onClick={handleDownload} />
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-400 rounded-full px-4 py-2"
          />

          <Dropdown
            title="Tracks"
            as="outlined"
            option={[
              { title: "Regular", icon: "" },
              { title: "SPJ", icon: "" },
              { title: "SPE", icon: "" },
            ]}
            className="px-4 py-2"
          />
        </div>

        <div className="my-4">
          {data?.map((students: any) => {
            const { lastName, firstName, middleName, suffix } =
              students.personalDetails;
            return (
              <div className="border border-gray-400  p-4 rounded-[5px] ">
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
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default ViewLevelList;
