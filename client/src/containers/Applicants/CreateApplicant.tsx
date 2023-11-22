import { Formik, Form } from "formik";

import useFormSubmit from "../../hooks/useFormSubmit";
import applicantInitialValue from "../../data/initialValue/applicantInit";
import { applicantInputMaps } from "../../models/applicantInitialValue";
import Input from "../../components/Input";
import { useState } from "react";
import { ApplicationFormModelProps } from "../../interface/ApplicantMode.Type";
import IconButton from "../../components/IconButton";
import ExpandDown from "../../assets/icons/Expand_down_light.svg";
import { InputProps } from "../../interface/FormInterface";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { PersonalDetailsFirstSection, suffixes } from "../../data/Stepper.Data";

const FormSection = ({ title, model }: ApplicationFormModelProps) => {
  const [hide, setHide] = useState(true);

  return (
    <Formik initialValues={applicantInitialValue} onSubmit={() => {}}>
      <Form>
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h4
            className="cursor-pointer"
            onClick={() => setHide((prev) => !prev)}>
            {title}
          </h4>

          <div className="flex gap-4">
            <IconButton
              icon={ExpandDown}
              onClick={() => setHide((prev) => !prev)}
            />
          </div>
        </div>

        {hide && (
          <div className="grid grid-cols-2 gap-4">
            {model.map((props: InputProps) => (
              <Input key={props.label} {...props} />
            ))}
          </div>
        )}
      </Form>
    </Formik>
  );
};

const CreateApplicant = () => {
  // mutation
  const { handleSubmit } = useFormSubmit({
    route: "test",
    type: "post",
  });

  return (
    <Formik initialValues={applicantInitialValue} onSubmit={handleSubmit}>
      <Form className="">
        <section className="">
          <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end"></div>

          <div className="flex flex-col gap-4">
            <h4 className="pb-4 border-b border-gray-400">Personal Details</h4>
            <div className="grid grid-cols-2 gap-6 items-center justify-center">
              {PersonalDetailsFirstSection.map((props: InputProps) => (
                <Input key={props.label} {...props} />
              ))}

              <Select
                label="Suffix"
                name="personalDetails.suffix"
                className="bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-[100px]">
                <option value={""}>Suffix</option>
                {suffixes.map((suff) => (
                  <option value={suff}>{suff}</option>
                ))}
              </Select>
            </div>

            {applicantInputMaps.map((section) => (
              <FormSection key={section.title} {...section} />
            ))}
          </div>
        </section>

        <section className="flex justify-end gap-4 w-full ">
          <Button as="contained" title="Create" />
        </section>
      </Form>
    </Formik>
  );
};

export default CreateApplicant;
