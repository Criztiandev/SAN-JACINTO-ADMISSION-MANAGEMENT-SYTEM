import { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Button,
  Drawer,
  IconButton,
  Loading,
  Carousel,
} from "../../components";
import { Form, Formik, FormikHelpers } from "formik";
import { EditIcon } from "../../assets/icons";
import ItemSelect from "../Form/ItemSelect";
import InputSections from "../Form/InputSections";

import {
  fetchApplicantByID,
  updateApplicantByID,
} from "../../api/Applicant.api";

import { FetchingDrawerProps } from "../../interface/Component.Type";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";

import {
  ApplicationFormInputModel,
  yearLevelsItemModel,
} from "../../helper/ApplicantionForm.Helper";

const ViewDrawer = ({
  data: APID = "",
  state = false,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: async () => fetchApplicantByID(APID),
    queryKey: ["applicantByID"],
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (value: ApplicantModelProps) =>
      updateApplicantByID(APID, value),
    mutationKey: [`applicantUpdate${APID}`],
  });

  const handleSubmit = async (
    values: ApplicantModelProps,
    action: FormikHelpers<ApplicantModelProps>
  ) => {
    try {
      mutate(values);
      setIsEdit(false);
      action.resetForm();
    } catch (e) {
      toast.error(e);
    }
  };

  const handleReset = () => {
    setIsEdit(false);
    toast.success("Application Form has been reset Successfully");
  };

  if (isLoading) return <Loading />;
  if (isPending) return <Loading />;
  if (isSuccess && !isPending) {
    toast.success("Applicant Updated Successfully");
    onClose();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClose}>
        <Formik initialValues={data.payload} onSubmit={handleSubmit}>
          <Form>
            <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
              <div>
                <h2 className="font-bold">
                  {data.payload.personalDetails.lastName || "Last"}{" "}
                  {data.payload.personalDetails.firstName || "First Name"}{" "}
                  {data.payload.personalDetails.middleName || "Middle Name"}{" "}
                  {data.payload.personalDetails.suffix || "Suffix"}
                </h2>
                <span className="text-gray-400 font-medium">
                  @{data.payload.personalDetails.email || "Email"}
                </span>
              </div>

              <IconButton
                type="outlined"
                icon={EditIcon}
                onClick={() => setIsEdit(prev => !prev)}
                className={`p-2 border border-gray-400 rounded-full  ${
                  isEdit ? "border-green-500 bg-[#22f86275]" : ""
                }`}
              />
            </header>

            <main>
              <section className="flex flex-col gap-2 justify-start items-start mb-4">
                <h4>Grade Level</h4>
                <Carousel width={"550px"}>
                  {yearLevelsItemModel.map(props => (
                    <ItemSelect
                      select="Grade 7"
                      key={props.title}
                      {...props}
                      name="studentDetails.yearLevel"
                    />
                  ))}
                </Carousel>
              </section>

              {ApplicationFormInputModel.map(props => (
                <InputSections key={props.title} {...props} isEdit={!isEdit} />
              ))}
            </main>

            {isEdit && (
              <footer className="flex gap-4 justify-end">
                <Button
                  as="button"
                  title="Reset"
                  onClick={handleReset}
                  disabled={isPending}
                />
                <Button as="submit" title="Submit" disabled={isPending} />
              </footer>
            )}
          </Form>
        </Formik>
      </Drawer>
    </Suspense>
  );
};

export default ViewDrawer;
