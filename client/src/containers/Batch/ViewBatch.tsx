/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "../../components/IconButton";
import Typography from "../../components/Typography";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import ExamineesCard from "./ExamineesCard";
import DeleteIcon from "../../assets/icons/Delete.svg";
import useURL from "../../hooks/useURL";
import EmptyCard from "../Common/EmptyCard";
import EditIcon from "../../assets/icons/Edit_light.svg";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ViewBatch = ({ APID }: { APID: string }) => {
  const [schedPayload, setSchedPayload] = useState<any>({});
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/batch/${APID}`,
    key: ["batch"],
  });

  const schedQuery = useQuery({
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/schedule/${data?.schedule}`
      );
      setSchedPayload(res.data.payload);
      return res.data;
    },
    queryKey: [`batchSched${data?.schedule}`],
  });

  if (isError || isLoading || schedQuery.isLoading || schedQuery.isError)
    return <FetchLoader />;

  const handleDelete = () => {
    updateURL(`state=delete&APID=${APID}`);
  };

  console.log(schedPayload?.schedule);
  const formatedStartDate = new Date(
    schedPayload?.schedule?.start
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formatedEndDate = new Date(
    schedPayload?.schedule?.end
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Formik
      initialValues={{
        title: "",
        examiniees: [],
      }}
      onSubmit={() => {}}>
      <Form>
        <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
          <div>
            <h1>{data?.title || "Title"}</h1>
            <span>
              {data?.schedule === null
                ? "Not yet specified"
                : `${formatedStartDate} - ${formatedEndDate}`}
            </span>
          </div>

          <div className="flex gap-4">
            <IconButton icon={EditIcon} as="outlined" />
            <IconButton
              icon={DeleteIcon}
              as="outlined"
              onClick={handleDelete}
            />
          </div>
        </header>

        <main>
          <Typography as="h4" className="mb-4 pb-2 border-b border-gray-300">
            Examiniees
          </Typography>

          <div className=" flex">
            {data?.length <= 0 ? (
              <EmptyCard title="No Examiniees Available" />
            ) : (
              data?.examiniees?.map(
                ({
                  personalDetails,
                  studentDetails,
                  gradeDetails,
                  ...props
                }: any) => {
                  const { lastName, middleName, firstName } = personalDetails;
                  const { track, yearLevel } = studentDetails;
                  const { generalAve } = gradeDetails;
                  const name = `${lastName}, ${firstName} ${middleName[0]}`;

                  return (
                    <ExamineesCard
                      key={props._id}
                      name={name}
                      yearLevel={yearLevel}
                      track={track}
                      ave={generalAve}
                      {...props}
                      disabled
                    />
                  );
                }
              )
            )}
          </div>
        </main>
      </Form>
    </Formik>
  );
};

export default ViewBatch;
