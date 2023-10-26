/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence } from "framer-motion";
import { Button, Drawer, Loading } from "../../components";
import { Form, Formik, FormikHelpers } from "formik";
import { FetchingDrawerProps } from "../../interface/Component.Type";
import ItemSelect from "../Form/ItemSelect";
import InputSections from "../Form/InputSections";
import Carousel from "../../components/Carousel";
import {
  ApplicationFormInputModel,
  yearLevelsItemModel,
} from "../../helper/ApplicantionForm.Helper";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchApplicantByID,
  updateApplicantByID,
} from "../../api/Applicant.api";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import { useState } from "react";

interface UpdatedApplicantByIDProps {
  id: string;
  values: object;
}

const EditDrawer = ({
  data: APID = "",
  state,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const [selectedYearLevel, setSelectedYearLevel] = useState("");

  const { data, isLoading, isFetching, refetch, isRefetchError } = useQuery({
    queryFn: async () => fetchApplicantByID(APID),
    queryKey: ["applicantByID", APID],
  });

  const { payload } = data || "";
  const { firstName, middleName, lastName, suffix } =
    payload?.personalDetails || "";

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, values }: UpdatedApplicantByIDProps) =>
      updateApplicantByID(id, values),

    onSuccess: () => handleSuccess(),

    onError: () => {
      toast.error("Something went wrong, Please Try again");
    },
  });

  const handleSuccess = () => {
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

  const handleSubmit = (
    values: ApplicantModelProps,
    action: FormikHelpers<ApplicantModelProps>
  ) => {
    mutate({ id: APID, values: values });
    refetch();

    action.resetForm();
  };

  if (isLoading || isPending || isFetching) return <Loading />;

  return (
    <>
      {state && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll"
            width="600px"
            state={state}
            onClick={onClose}>
            <Formik initialValues={payload} onSubmit={handleSubmit}>
              <Form>
                <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
                  <div>
                    <h2 className="font-bold">Edit Applicant</h2>
                    <span className="text-gray-400 font-medium"></span>
                  </div>
                </header>

                <main>
                  <section className="flex flex-col gap-2 justify-start items-start mb-4">
                    <h4>Grade Level</h4>
                    <Carousel width={"550px"}>
                      {yearLevelsItemModel.map(props => (
                        <ItemSelect
                          key={props.title}
                          select={selectedYearLevel}
                          onSelect={setSelectedYearLevel}
                          {...props}
                          name="studentDetails.yearLevel"
                        />
                      ))}
                    </Carousel>
                  </section>

                  {ApplicationFormInputModel.map(props => (
                    <InputSections key={props.title} {...props} />
                  ))}
                </main>

                <footer className="flex justify-end items-center gap-4">
                  <Button as="button" title="Cancel" />
                  <Button as="submit" title="Save" />
                </footer>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default EditDrawer;
