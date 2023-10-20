import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button, Drawer } from "../../components";
import { Form, Formik } from "formik";

import Carousel from "../../components/Carousel";
import ItemSelect from "../Form/ItemSelect";
import applicantInitialValue from "../../data/initialValue/applicantInit";

import InputSections from "../Form/InputSections";
import {
  ApplicationFormInputModel,
  yearLevelsItemModel,
} from "../../helper/applicantFormObject";
import { CreateDrawerProps } from "../../interface/Component.Type";

const CreateDrawer = ({ state, onClose }: CreateDrawerProps) => {
  const [selectedYearLevel, setSelectedYearLevel] = useState("");

  return (
    <>
      {state && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll"
            width="600px"
            state={state}
            onClick={onClose}>
            <Formik
              initialValues={applicantInitialValue}
              onSubmit={(values, action) => {
                // clean up
                console.log(values);
                onClose();
                action.resetForm();
              }}>
              <Form>
                <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
                  <div>
                    <h2 className="font-bold">Create Applicant</h2>
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
                          {...props}
                          select={selectedYearLevel}
                          onSelect={setSelectedYearLevel}
                          name="studentDetails.yearLevel"
                        />
                      ))}
                    </Carousel>
                  </section>

                  {ApplicationFormInputModel.map(props => (
                    <InputSections {...props} />
                  ))}
                </main>
                <footer className="flex justify-end items-center gap-4">
                  <Button as="reset" title="Reset" />
                  <Button as="submit" title="Submit" />
                </footer>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default CreateDrawer;
