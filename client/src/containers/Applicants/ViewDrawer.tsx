import { AnimatePresence } from "framer-motion";
import { Avatar, Button, Drawer, IconButton, Input } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import applicantData from "../../data/applicantData.json";
import { Form, Formik } from "formik";
import { applicantInputMaps } from "../../models/applicantModel";
import { useState } from "react";
import { applicantInputMapsInterface } from "../../interface/applicantModelInterface";

import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import { InputInterface } from "../../interface/componentInterface";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";

interface ViewDrawerProps {
  data: Array<object>;
  state: boolean;
  onClick: () => void;
  onEdit?: boolean;
}

const FormSection = ({ title, details }: applicantInputMapsInterface) => {
  const [hide, setHide] = useState(true);
  const [onEdit, setOnEdit] = useState(true);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide(prev => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            icon={EditIcon}
            onClick={() => setOnEdit(prev => !prev)}
          />
          <IconButton
            icon={Expand_Down}
            onClick={() => setHide(prev => !prev)}
          />
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {details.map((props: InputInterface) => (
            <Input key={props.label} {...props} disabled={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

const ViewDrawer = ({ data, state, onClick }: ViewDrawerProps) => {
  const response = applicantData[0];
  const { firstName, middleName, lastName, suffix, email } =
    response.personalDetails;

  return (
    <AnimatePresence mode="wait">
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClick}>
        <Formik
          initialValues={response}
          onSubmit={(values, action) => {
            // clean up
            alert(values);
            onClick();
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
              <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
                <div className="flex items-center gap-4">
                  <Avatar src={FemaleProfile} size="84px" />
                  <span className=" text-white">
                    <span className="flex gap-2">
                      <div>Grade</div>
                      <Input
                        name="studentDetails.yearLevel"
                        unstyled
                        disabled={true}
                      />
                    </span>

                    <Input name="studentDetails.track" unstyled />
                  </span>
                </div>
              </div>

              {applicantInputMaps.map(section => (
                <FormSection {...section} />
              ))}
            </main>
            <footer className="flex justify-end items-center gap-4">
              <Button title="Hold" />
              <Button as="submit" title="Accept" />
            </footer>
          </Form>
        </Formik>
      </Drawer>
    </AnimatePresence>
  );
};

export default ViewDrawer;
