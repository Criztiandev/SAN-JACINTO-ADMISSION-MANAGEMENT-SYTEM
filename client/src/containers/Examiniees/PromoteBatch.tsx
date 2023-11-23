/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "../../components/IconButton";
import Typography from "../../components/Typography";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "../../assets/icons/Delete.svg";
import useURL from "../../hooks/useURL";
import { Form, Formik } from "formik";
const PromoteBatch = () => {
  const { updateURL } = useURL();

  //   const { data, isLoading, isError } = useFetch({
  //     route: `/examiniees`,
  //     key: ["examiniees"],
  //     option: {},
  //   });

  const { data } = useFetch({
    route: `/examiniees?status=done`,
    key: ["examiniees"],
  });

  console.log(data);

  //   const handleDelete = () => {
  //     updateURL(`APID=${APID}&state=delete`);
  //   };

  //   const handleAnnouce = () => {
  //     updateURL(`APID=${APID}&state=annoucement`);
  //   };

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
            <h1>Bulk Promote</h1>
          </div>

          <div className="flex gap-4">
            <IconButton icon={DeleteIcon} as="outlined" />
          </div>
        </header>

        <main>
          <Typography as="h4" className="mb-4 pb-2 border-b border-gray-300">
            Examiniees
          </Typography>

          <div className="flex gap-4 max-h-[400px] overflow-y-auto">
            {/* {data?.length <= 0 ? (
              <EmptyCard title="No Examiniees Available" />
            ) : (
              data?.selected?.map((props: any) => {
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
            )} */}
          </div>

          <div className="absolute bottom-3 right-5">
            {/* <Button title="Annouce" onClick={handleAnnouce} /> */}
          </div>
        </main>
      </Form>
    </Formik>
  );
};

export default PromoteBatch;
