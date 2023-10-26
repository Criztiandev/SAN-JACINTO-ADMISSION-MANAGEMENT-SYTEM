/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Button,
  Drawer,
  IconButton,
  Loading,
  Carousel,
} from "../../components";
import { Form, Formik, FormikHelpers, Field } from "formik";
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
import { PersoanlDetailsNameInput } from "../../helper/Applicant.Helper";

const ViewDrawer = ({
  data: APID = "",
  state = false,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const [isEdit, setIsEdit] = useState(false);

  // Query
  const { data, isLoading, isFetching, refetch, isRefetchError } = useQuery({
    queryFn: async () => fetchApplicantByID(APID),
    queryKey: ["applicantByID", APID],
  });

  const { payload } = data || "";
  const { firstName, middleName, lastName, suffix, email } =
    payload?.personalDetails || "";

  // Memoized Data
  const memoizedData = useMemo(() => data?.payload, [data?.payload]);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (value: ApplicantModelProps) =>
      updateApplicantByID(APID, value),
    mutationKey: [`applicantUpdate${APID}`],
    onSuccess: () => handleSuccess(),

    onError: () => {
      toast.error("Something Went Wrong Please Try again");
    },
  });

  // Handling Reset
  const handleReset = () => {
    setIsEdit(false);
    toast.success("Application Form has been reset Successfully");
  };

  const handleSuccess = () => {
    setIsEdit(false);
    if (!isRefetchError) {
      refetch();
      toast.success(
        `${lastName} ${firstName} ${middleName[0]} ${
          suffix || ""
        }'s credentials been Updated Successfully`
      );
    } else {
      toast.error("Fetching Error");
    }
  };

  // Hanlding Submit
  const handleSubmit = async (
    values: ApplicantModelProps,
    action: FormikHelpers<ApplicantModelProps>
  ) => {
    try {
      mutate(values);
      action.resetForm();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (isLoading || isPending || isFetching) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClose}>
        <Formik initialValues={memoizedData} onSubmit={handleSubmit}>
          <Form>
            <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
              <div className="flex flex-col">
                {isEdit ? (
                  <div className="grid grid-cols-4 gap-2 w-[480px]">
                    {PersoanlDetailsNameInput.map(props => (
                      <Field
                        key={props.name}
                        {...props}
                        className="outline-none border-b-2 border-black text-[28px] font-bold mb-2 "
                      />
                    ))}
                  </div>
                ) : (
                  <h2 className="font-bold">
                    {lastName || "Last"} {firstName || "First Name"}{" "}
                    {middleName || "Middle Name"} {suffix || ""}
                  </h2>
                )}
                {isEdit ? (
                  <Field
                    name="personalDetails.email"
                    className="text-gray-400 font-medium border-b-2 border-black w-[300px]"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">
                    @{email || "Email"}
                  </span>
                )}
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
                <div className="opacity-50">
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
                </div>
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
