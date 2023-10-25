import { Drawer, IconButton, Loading } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import applicantData from "../../data/applicantData.json";
import { Form, Formik, FormikHelpers } from "formik";

import { FetchingDrawerProps } from "../../interface/Component.Type";
import Carousel from "../../components/Carousel";
import {
  ApplicationFormInputModel,
  yearLevelsItemModel,
} from "../../helper/ApplicantionForm.Helper";
import ItemSelect from "../Form/ItemSelect";
import InputSections from "../Form/InputSections";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicantByID } from "../../api/Applicant.api";
import { Suspense } from "react";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";

const ViewDrawer = ({
  data: APID,
  state = false,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => fetchApplicantByID(APID),
    queryKey: ["applicantByID"],
  });

  const handleSubmit = (
    values: ApplicantModelProps,
    action: FormikHelpers<ApplicantModelProps>
  ) => {
    // clean up
    console.log(values);
    onClose();
    action.resetForm();
  };

  const { lastName, firstName, middleName, suffix } =
    data.payload.personalDetails;

  if (isLoading) return <Loading />;
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
                  {lastName || "Last"} {firstName || "First Name"}{" "}
                  {middleName || "Middle Name"} {suffix || "Suffix"}
                </h2>
                <span className="text-gray-400 font-medium">
                  @{data.payload.email || "Email"}
                </span>
              </div>

              <IconButton type="outlined" icon={EditIcon} />
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
                <InputSections key={props.title} {...props} isEdit={true} />
              ))}
            </main>
          </Form>
        </Formik>
      </Drawer>
    </Suspense>
  );
};

export default ViewDrawer;
