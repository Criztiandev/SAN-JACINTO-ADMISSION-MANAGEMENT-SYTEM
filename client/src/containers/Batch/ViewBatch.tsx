/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "../../components/IconButton";
import Typography from "../../components/Typography";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import ExamineesCard from "./ExamineesCard";
import DeleteIcon from "../../assets/icons/Delete.svg";
import useURL from "../../hooks/useURL";
import EmptyCard from "../Common/EmptyCard";
import { Form, Formik } from "formik";
import MessageIcon from "../../assets/icons/Message_Dark.svg";

const ViewBatch = ({ APID }: { APID: string }) => {
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/batch/${APID}`,
    key: ["batch"],
    option: {
      enabled: !!APID,
    },
  });

  const { data: querySchedPayload } = useFetch({
    route: `/schedule/${data?.schedule}`,
    key: ["test"],
    option: {
      queryKey: ["test"],
      enabled: !!data?.schedule,
    },
  });

  const handleDelete = () => {
    updateURL(`APID=${APID}&state=delete`);
  };

  const handleAnnouce = () => {
    updateURL(`APID=${APID}&state=annoucement`);
  };

  if (isError || isLoading) return <FetchLoader />;

  const currentYear = new Date().getFullYear();
  const formatedStartDate = new Date(
    querySchedPayload?.schedule?.start
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formatedEndDate = new Date(
    querySchedPayload?.schedule?.end
  ).toLocaleDateString("en-US", {
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
      <Form className="">
        <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
          <div>
            <h1>{data?.title || "Title"}</h1>
            <span>
              {data?.schedule === null
                ? "📅 Not yet specified"
                : `${formatedStartDate} - ${formatedEndDate}, ${currentYear}`}
            </span>
          </div>

          <div className="flex gap-4">
            <IconButton
              icon={MessageIcon}
              as="outlined"
              onClick={handleAnnouce}
            />
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

          <div className="flex max-h-[400px] overflow-y-auto">
            {data?.length <= 0 ? (
              <EmptyCard title="No Examiniees Available" />
            ) : (
              data?.examiniees?.map((props: any) => {
                const { lastName, middleName, firstName } =
                  props.personalDetails;
                const { track, yearLevel } = props.studentDetails;
                const { generalAve } = props.gradeDetails;
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
              })
            )}
          </div>
        </main>
      </Form>
    </Formik>
  );
};

export default ViewBatch;
