/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from "formik";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import useFormSubmit from "../../hooks/useFormSubmit";
import ExamineesCard from "../Schedule/ExamineesCard";
import useURL from "../../hooks/useURL";

const CreateBatch = () => {
  const { reload } = useURL();

  const { data, isLoading, isError, isFetched } = useFetch({
    route: "/batch/examiniees",
    key: ["batchExaminies"],
  });

  const { handleSubmit } = useFormSubmit({
    route: "/batch/create",
    redirect: "/batch",
    overideFn: reload,
  });

  if (isLoading || isError || !isFetched) return <FetchLoader />;

  return (
    <div>
      <header className="pb-4 mb-4 border-b border-gray-400">
        <h1>Create Batch</h1>
        <span>You can create event to this form</span>
      </header>

      <main>
        <Formik
          initialValues={{
            title: "",
            examiniees: [],
          }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-4">
            <section>
              <Typography
                as="h4"
                className="pb-2 border-b border-gray-200 mb-4">
                Details
              </Typography>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title"
                  name="title"
                  placeholder="Enter Batch Title"
                />

                <Input
                  type="date"
                  label="Schedule"
                  name="title"
                  placeholder="Enter"
                  disabled={true}
                />
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-4">
                <Typography as="h4" className="">
                  Examiniees
                </Typography>
              </div>
              {data?.length <= 0 ? (
                <div className="w-full border h-[200px] bg-gray-400 rounded-[5px] flex justify-center items-center font-bold text-[32px]">
                  No Examiniees Available
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {data?.map(
                    ({
                      _id,
                      personalDetails,
                      studentDetails,
                      gradeDetails,
                    }: any) => {
                      const { firstName, middleName, lastName } =
                        personalDetails;
                      const { yearLevel, track } = studentDetails;
                      return (
                        <ExamineesCard
                          _id={_id}
                          name={`${lastName}, ${firstName} ${middleName[0]}.`}
                          yearLevel={yearLevel}
                          track={track}
                          ave={gradeDetails?.generalAve}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </section>

            <section className="flex justify-end gap-4">
              <Button
                type="submit"
                title="Submit"
                disabled={data?.length <= 0 && true}
              />
            </section>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default CreateBatch;
