/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "../../components/IconButton";
import Typography from "../../components/Typography";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import ExamineesCard from "../Schedule/ExamineesCard";
import DeleteIcon from "../../assets/icons/Delete.svg";
import useURL from "../../hooks/useURL";

const ViewBatch = ({ APID }: { APID: string }) => {
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/batch/${APID}`,
    key: ["batch"],
  });

  const handleDelete = () => {
    updateURL(`state=delete&APID=${APID}`);
  };

  if (isError || isLoading) return <FetchLoader />;

  return (
    <div>
      <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
        <div>
          <h1>{data?.title || "Title"}</h1>
          <span>
            {data?.schedule === null ? "Not yet specified" : data?.schedule}
          </span>
        </div>

        <IconButton icon={DeleteIcon} as="outlined" onClick={handleDelete} />
      </header>

      <main>
        <Typography as="h4" className="mb-4 pb-2 border-b border-gray-300">
          Examiniees
        </Typography>
        {data?.length <= 0 ? (
          <div className="w-full border h-[200px] bg-gray-400 rounded-[5px] flex justify-center items-center font-bold text-[32px]">
            No Examiniees Available
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {data?.examiniees?.map(
              ({ _id, personalDetails, studentDetails, gradeDetails }: any) => (
                <ExamineesCard
                  key={_id}
                  _id={_id}
                  name={`${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName[0]}`}
                  yearLevel={studentDetails?.yearLevel}
                  track={studentDetails?.track}
                  ave={gradeDetails.generalAve}
                  disabled
                />
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewBatch;
