import { applicantInputMaps } from "../../models/applicantInitialValue";
import EditIcon from "../../assets/icons/Edit_light.svg";
import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import { useState } from "react";
import { useFormikContext } from "formik";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";
import { InputProps } from "../../interface/FormInterface";
import {
  ApplicationFormModelProps,
  ApplicantModelProps,
} from "../../interface/ApplicantMode.Type";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import Avatar from "../../components/Avatar";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import Typography from "../../components/Typography";

const FormSection = ({ title, model }: ApplicationFormModelProps) => {
  FetchLocalStorageFormData("applicant_form");
  const [hide, setHide] = useState(false);
  const [onEdit, setOnEdit] = useState(true);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide((prev) => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            icon={EditIcon}
            onClick={() => setOnEdit((prev) => !prev)}
          />
          <IconButton
            icon={Expand_Down}
            onClick={() => setHide((prev) => !prev)}
          />
        </div>
      </div>

      {!hide && (
        <div className="grid grid-cols-2 gap-4">
          {model.map((props: InputProps) => (
            <Input key={props.label} {...props} disabled={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationForm = () => {
  const { values } = useFormikContext<ApplicantModelProps>();
  const { firstName, middleName, lastName, gender } =
    values?.personalDetails || {};
  const { yearLevel, track } = values?.studentDetails || {};

  return (
    <section>
      <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
        <div className="flex items-center gap-4">
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
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {applicantInputMaps.map((section) => (
          <FormSection key={section.title} {...section} />
        ))}
      </div>
    </section>
  );
};

export default ApplicationForm;
