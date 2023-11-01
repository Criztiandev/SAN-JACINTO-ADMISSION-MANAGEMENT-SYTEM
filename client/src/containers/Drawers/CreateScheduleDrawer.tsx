import { useQuery } from "@tanstack/react-query";
import { Drawer } from "../../components";
import { scheduleModelInit } from "../../data/initialValue/annoucementInit";
import { ToggleDrawer } from "../../interface/Drawer.Types";
import { ScheduleModelProps } from "../../interface/Schedule.Types";
import { FormikHelpers, Formik, Form } from "formik";
import { fetchAllData } from "../../utils/Api.utils";
import FetchLoader from "../General/FetchLoader";
import { toast } from "react-toastify";
import { useState } from "react";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";

const CreateScheduleDrawer = ({ onClose, ...props }: ToggleDrawer) => {
  const [currentData, setCurrentData] = useState<ApplicantModelProps | object>(
    {}
  );
  const { data, isLoading, isFetched, isError } = useQuery({
    queryFn: async () => fetchAllData("applicant"),
    queryKey: ["examineeData"],
  });

  if (isError) {
    toast.error("Examines Cannot be Loaded");
    onClose();
  }

  if (isFetched) {
    toast.success("Fetched Successfully");
  }

  if (isLoading) <FetchLoader />;

  const handleSubmit = (
    value: ScheduleModelProps,
    action: FormikHelpers<ScheduleModelProps>
  ) => {
    alert(value);
    action.resetForm();
  };

  return (
    <Drawer
      onClick={onClose}
      {...props}
      className="overflow-scroll"
      width="600px">
      <Formik initialValues={scheduleModelInit} onSubmit={handleSubmit}>
        <Form className="">
          <header className="flex flex-col border-b border-gray-400 p-2">
            <h2>Create New Annoucement</h2>
            <span>You can create event to this form, I miss you</span>
          </header>
          <main>
            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">Students</h5>

              <div className="grid grid-cols-2 gap-4 justify-items-between items-center max-h-[300px] overflow-y-scroll my-4"></div>
            </section>

            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">Details</h5>
              <div className="grid grid-cols-2 gap-4">
                {/* {DetailsInput.map((props) => (
                  <Input key={props.label} {...props} />
                ))} */}
              </div>
            </section>

            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">
                Date && Time
              </h5>

              {/* <DateSelect {...selectedSlot} /> */}
            </section>

            <section className="h-[350px] flex flex-col mb-4">
              <h5 className="pb-2 my-4 border-b border-gray-400">Content</h5>
              {/* <Textarea label="Annoucement" name="content" /> */}
            </section>
          </main>

          <div className="flex justify-end gap-4">
            {/* <Button as="reset" title="Reset" />
            <Button as="submit" title="Submit" /> */}
          </div>
        </Form>
      </Formik>
    </Drawer>
  );
};

export default CreateScheduleDrawer;
