import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button, Drawer, Typography } from "../../components";
import { Form, Formik } from "formik";

import applicantModel, {
  applicantInputMaps,
} from "../../models/applicantModel";
import Carousel from "../../components/Carousel";
import ItemSelect from "../Form/ItemSelect";
interface CreateDrawerProps {
  state: boolean;
  onClose: () => void;
}

const yearLevels = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

const suffixes = [
  "Jr.",
  "Sr.",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];

const CreateDrawer = ({ state, onClose }: CreateDrawerProps) => {
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [selectGender, setSelectGender] = useState("");

  console.log(selectedYearLevel);

  return (
    <AnimatePresence mode="wait">
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClose}>
        <Formik
          initialValues={applicantModel}
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
              <section className="flex flex-col gap-2 justify-start items-start">
                <h4 className="cursor-pointer mb-2">Grade Level</h4>

                <Carousel width={"550px"}>
                  {yearLevels.map(props => (
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

              <section>{applicantInputMaps[1].title}</section>

              {/* <div className="grid grid-cols-2 gap-4 mb-4">
                <Input label="First Name" name="personalDetails.firstName" />
                <Input
                  label="Middle Name Name"
                  name="personalDetails.middleName"
                />
                <Input label="Last Name" name="personalDetails.lastName" />
                <Select
                  label="Suffix"
                  name="personalDetails.suffix"
                  className="bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-[100px]">
                  <option value={""}>N/A</option>
                  {suffixes.map(letters => (
                    <option key={letters} value={letters}>
                      {letters}
                    </option>
                  ))}
                </Select>
              </div>
              {applicantInputMaps.map(section => (
                <FormSection {...section} />
              ))} */}
            </main>
            <footer className="flex justify-end items-center gap-4">
              <Button as="reset" title="Reset" />
              <Button as="submit" title="Submit" />
            </footer>
          </Form>
        </Formik>
      </Drawer>
    </AnimatePresence>
  );
};

export default CreateDrawer;
