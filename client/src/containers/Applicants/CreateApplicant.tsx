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

const FormSection = ({ title, model }: ApplicationFormModelProps) => {
  const [hide, setHide] = useState(true);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide((prev) => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          {/* <IconButton
            icon={EditIcon}
            onClick={() => setOnEdit((prev) => !prev)}
          /> */}
          <IconButton
            icon={ExpandDown}
            onClick={() => setHide((prev) => !prev)}
          />
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {model.map((props: InputProps) => (
            <Input key={props.label} {...props} disabled={onEdit} />
          ))}
        </div>
      )}
    </div>
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
          <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
            {/* <div className="flex items-center gap-4">
              <Avatar
                src={gender === "Male" ? MaleProfile : FemaleProfile}
                size="84px"
              />
              <div className="text-white">
                <Typography as="h4">
                  {lastName}, {firstName} {middleName}
                </Typography>
                <Typography as="span">
                  {yearLevel} {track && `| ${track}`}
                </Typography>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col gap-4">
            {applicantInputMaps.map((section) => (
              <FormSection key={section.title} {...section} />
            ))}
          </div>
        </section>

        <section className="flex justify-end gap-4 w-full ">
          <IconButton as="outlined" type="button" />
          <Button as="contained" title="Create" />
        </section>
      </Form>
    </Formik>
  );
};

export default CreateApplicant;
