import { AnimatePresence } from "framer-motion";
import { Avatar, Button, Drawer, IconButton, Input } from "../../components";
import EditIcon from "../../assets/icons/Edit_light.svg";
import applicantData from "../../data/applicantData.json";
import { Field, Form, Formik } from "formik";
import { applicantInputMaps } from "../../models/applicantModel";
import { useState } from "react";
import { applicantInputMapsInterface } from "../../interface/applicantModelInterface";

import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import { InputInterface } from "../../interface/componentInterface";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";

interface EditDrawerProps {
  data: Array<object>;
  state: boolean;
  onClick: () => void;
  onEdit?: boolean;
}

const FormSection = ({ title, details }: applicantInputMapsInterface) => {
  const [hide, setHide] = useState(true);
  const [onEdit, setOnEdit] = useState(false);

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

const EditDrawer = ({ data, state, onClick }: EditDrawerProps) => {
  const response = applicantData[0];
  const { firstName, middleName, lastName, suffix, email } =
    response.personalDetails;
  const [fullName, setFullName] = useState(
    `${lastName}, ${firstName} ${middleName}. ${suffix}`
  );

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
            <header className="flex justify-between items-start border-b border-gray-400 pb-2 mb-4">
              <div className="flex gap-2 flex-col">
                <div className="">
                  <input
                    className="border-b border-x-gray-400  font-bold text-[28px] focus:border  focus:rounded-[5px] "
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Smith, John Mark Mitra. JR"
                  />
                </div>
                <Field
                  type="email"
                  name="personalDetails.email"
                  className=" text-gray-400 font-normal py-[2px] px-2"
                />
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
              <Button as="submit" title="Save" />
            </footer>
          </Form>
        </Formik>
      </Drawer>
    </AnimatePresence>
  );
};

export default EditDrawer;
