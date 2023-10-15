import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button, Drawer, IconButton, Input, Select } from "../../components";
import { Form, Formik } from "formik";
import { applicantInputMaps } from "../../models/applicantModel";
import { InputInterface } from "../../interface/componentInterface";
import { applicantInputMapsInterface } from "../../interface/applicantModelInterface";

import EditIcon from "../../assets/icons/Edit_light.svg";
import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import applicantModel from "../../models/applicantModel";
interface CreateDrawerProps {
  state: boolean;
  onClick: () => void;
}

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

const FormSection = ({ title, details }: applicantInputMapsInterface) => {
  const [hide, setHide] = useState(true);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide(prev => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            icon={Expand_Down}
            onClick={() => setHide(prev => !prev)}
          />
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {details.map((props: InputInterface) => (
            <Input key={props.label} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

const CreateDrawer = ({ state, onClick }: CreateDrawerProps) => {
  return (
    <AnimatePresence mode="wait">
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClick}>
        <Formik
          initialValues={applicantModel}
          onSubmit={(values, action) => {
            // clean up
            alert(values);
            onClick();
            action.resetForm();
          }}>
          <Form>
            <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
              <div>
                <h2 className="font-bold">Create Applicant</h2>
                <span className="text-gray-400 font-medium">
                  create applicant here
                </span>
              </div>

              <IconButton type="outlined" icon={EditIcon} />
            </header>

            <main>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
  );
};

export default CreateDrawer;
