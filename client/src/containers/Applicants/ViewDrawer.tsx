import { AnimatePresence } from "framer-motion";
import { Button, Drawer, IconButton } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import applicantData from "../../data/applicantData.json";
import { Form, Formik } from "formik";

import { FetchingDrawerProps } from "../../interface/Component.Type";
import Carousel from "../../components/Carousel";
import {
  ApplicationFormInputModel,
  yearLevelsItemModel,
} from "../../helper/applicantFormObject";
import ItemSelect from "../Form/ItemSelect";
import InputSections from "../Form/InputSections";

const ViewDrawer = ({
  data,
  state = false,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const response = applicantData[0];
  const { firstName, middleName, lastName, suffix, email } =
    response.personalDetails;

  return (
    <AnimatePresence mode="wait">
      {state && (
        <Drawer
          className="overflow-scroll"
          width="600px"
          state={state}
          onClick={onClose}>
          <Formik
            initialValues={response}
            onSubmit={(values, action) => {
              // clean up
              console.log(values);
              onClose();
              action.resetForm();
            }}>
            <Form>
              <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
                <div>
                  <h2 className="font-bold">
                    {lastName}, {firstName} {middleName}. {suffix}
                  </h2>
                  <span className="text-gray-400 font-medium">@{email}</span>
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
      )}
    </AnimatePresence>
  );
};

export default ViewDrawer;
