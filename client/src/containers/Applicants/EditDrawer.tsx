import { AnimatePresence } from "framer-motion";
import { Button, Drawer, IconButton, Input } from "../../components";
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
import Carousel from "../../components/Carousel";
import useCarousel from "../../hooks/useCarousel";

import { motion } from "framer-motion";
import RadioItems from "../Register/RadioItems";

interface EditDrawerProps {
  data: Array<object>;
  state: boolean;
  onClick: () => void;
  onEdit?: boolean;
}

const yearLevels: ItemSelection[] = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

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
  const [selectedGender, setSelectedGender] = useState("");
  const { carouselRef, carouselWidth } = useCarousel();
  const response = applicantData[0];

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
                <h2 className="font-bold">Edit Applicant</h2>
                <span className="text-gray-400 font-normal">
                  if there is wrong you can edit their credentials
                </span>
              </div>
            </header>
            <main>
              <div className="border overflow-hidden">
                <motion.div
                  ref={carouselRef}
                  drag="x"
                  dragConstraints={{ right: 0, left: -carouselWidth }}
                  className="">
                  <Carousel>
                    {yearLevels.map((props, index) => (
                      <RadioItems
                        key={props.title}
                        {...props}
                        index={index}
                        name="studentDetails.yearLevel"
                      />
                    ))}
                  </Carousel>
                </motion.div>
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
