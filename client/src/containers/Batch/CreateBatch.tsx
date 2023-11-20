/* eslint-disable @typescript-eslint/no-explicit-any */
// External Imports
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";

// Component Imports
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Input from "../../components/Input";

// Hook Imports
import useFetch from "../../hooks/useFetch";
import useFormSubmit from "../../hooks/useFormSubmit";
// Custom Component Import
import EmptyCard from "../Common/EmptyCard";
import Dropdown from "../../components/Dropdown";
import ExamineesCard from "./ExamineesCard";

const CreateBatch = () => {
  const [preferedLevel, setPreferedLevel] = useState("SPJ");
  const [type, setType] = useState("examinition");

  const { handleSubmit } = useFormSubmit({
    route: "/batch/create",
    redirect: "/batch?refetch=true",
  });

  // fetch by status

  const examinationQuery = useFetch({
    route: "/batch/examiniees",
    key: ["batch_examinies"],
    option: {
      enabled: type === "examinition",
    },
  });

  const regularApplicantQuery = useFetch({
    route: "/applicant?role=regular&&status=accepted",
    key: ["regular"],
    option: {
      enabled: type === "schedule",
    },
  });

  const payload =
    type === "examinition"
      ? examinationQuery?.data?.filter((field: any) => {
          const { studentDetails } = field;
          return studentDetails.track === preferedLevel;
        })
      : regularApplicantQuery?.data || [];

  const handleSelectLevel = (e: MouseEvent<HTMLButtonElement>) => {
    setPreferedLevel(e.currentTarget.value);
  };

  return (
    <div className="">
      <header className="pb-4 mb-4 border-b border-gray-400">
        <h1>Create Batch</h1>
        <span>You can create event to this form</span>
      </header>

      <main className="">
        <Formik
          initialValues={{
            title: "",
            selected: [],
          }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-4">
            <section>
              <Typography as="h4">Type</Typography>
              <div className="flex justify-center items-center gap-8">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`w-[200px] h-[220px] rounded-[5px] border shadow-md flex justify-center items-center flex-col gap-2 ${
                    type === "examinition"
                      ? "border-slate-700 border-2"
                      : "opacity-70"
                  }`}
                  onClick={() => setType("examinition")}>
                  <div className="w-24 h-24 rounded-full bg-blue-400"></div>
                  <span className="text-lg font-semibold">Examination</span>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`w-[200px] h-[220px] rounded-[5px] border shadow-md flex justify-center items-center flex-col gap-2 ${
                    type === "schedule"
                      ? "border-slate-700 border-2"
                      : "opacity-70"
                  }`}
                  onClick={() => setType("schedule")}>
                  <div className="w-24 h-24 rounded-full bg-blue-400"></div>
                  <span className="text-lg font-semibold">Schedule</span>
                </motion.div>
              </div>
            </section>

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
                  {type === "examinition" ? "  Examiniees" : "Applicants"}
                </Typography>

                {type === "examinition" && (
                  <div className="flex gap-2">
                    <Dropdown
                      type="button"
                      as="outlined"
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
                )}
              </div>

              <div className="border flex gap-4 flex-col">
                {payload?.length <= 0 ? (
                  <EmptyCard
                    title={
                      type === "" ? "Please Selete a type" : "No Data Available"
                    }
                  />
                ) : (
                  <>
                    {payload?.map((props: any) => {
                      const { personalDetails, gradeDetails, studentDetails } =
                        props;
                      const fullName = `${personalDetails?.lastName}, ${personalDetails?.firstName} ${personalDetails?.middleName}`;
                      return (
                        <ExamineesCard
                          key={props._id}
                          _id={props._id}
                          name={fullName}
                          ave={gradeDetails?.generalAve}
                          track={studentDetails?.track}
                          yearLevel={studentDetails?.yearLevel}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </section>

            <section className="sticky bottom-0 right-5 flex justify-end gap-4">
              <Button
                type="submit"
                title="Submit"
                disabled={payload?.length <= 0 && true}
              />
            </section>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default CreateBatch;
