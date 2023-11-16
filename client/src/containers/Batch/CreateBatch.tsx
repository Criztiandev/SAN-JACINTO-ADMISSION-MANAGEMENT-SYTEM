/* eslint-disable @typescript-eslint/no-explicit-any */
// External Imports
import { Formik, Form } from "formik";
import { MouseEvent, useEffect, useState } from "react";

// Component Imports
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";

// Hook Imports
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import useFormSubmit from "../../hooks/useFormSubmit";
import useURL from "../../hooks/useURL";

// Custom Component Import
import ExamineesCard from "./ExamineesCard";
import EmptyCard from "../Common/EmptyCard";
import Dropdown from "../../components/Dropdown";

const CreateBatch = () => {
  const [payload, setPayload] = useState([{}]);
  const [panel, setPanel] = useState("Juniors");
  const [selectAll, setSelectAll] = useState(false);

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

  const handleFilterExaminees = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedPanel = e.currentTarget.value;
    setPanel(selectedPanel);
  };

  useEffect(() => {
    if (isFetched && data) {
      const filteredData = isFetched
        ? data.filter(({ studentDetails }: any) => {
            const { yearLevel } = studentDetails;
            return panel === "Seniors"
              ? yearLevel === "Grade 11" || yearLevel === "Grade 12"
              : true;
          })
        : [];
      setPayload(filteredData);
    }
  }, [data, isFetched, panel]);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

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
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-4">
                <Typography as="h4" className="">
                  Examiniees
                </Typography>

                <div className="flex gap-2">
                  <Dropdown
                    type="button"
                    title={panel || "Grade level"}
                    className="p-4 flex gap-2 flex-col w-[120px]"
                    onClick={handleFilterExaminees}
                    option={[
                      { title: "Juniors", icon: "" },
                      { title: "Seniors", icon: "" },
                    ]}
                  />
                  <IconButton
                    as={selectAll ? "contained" : "outlined"}
                    onClick={handleSelectAll}
                  />
                </div>
              </div>

              <div className="border flex">
                {payload?.length <= 0 ? (
                  <EmptyCard title="No Examiniees Available" />
                ) : (
                  data?.map(
                    ({
                      personalDetails,
                      studentDetails,
                      gradeDetails,
                      ...props
                    }: any) => {
                      const { lastName, middleName, firstName } =
                        personalDetails;
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
                          selected={selectAll}
                          {...props}
                        />
                      );
                    }
                  )
                )}
              </div>
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
