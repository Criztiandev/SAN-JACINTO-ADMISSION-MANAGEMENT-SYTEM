import { IconButton, Input, Typography } from "../../components";
import { applicantInputMapsInterface } from "../../interface/applicantModelInterface";
import { applicantInputMaps } from "../../models/applicantModel";

import EditIcon from "../../assets/icons/Edit_light.svg";
import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import { useState } from "react";
import { InputInterface } from "../../interface/componentInterface";

const FormSection = ({ title, details }: applicantInputMapsInterface) => {
  const [hide, setHide] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div>
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

const ApplicationForm = () => {
  return (
    <section>
      <div className="bg-gray-400 w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
        <div className="flex items-center gap-4">
          <div className="w-[84px] h-[84px] rounded-full border"></div>
          <div>
            <Typography as="h4">Criztian Jade M Tuplano</Typography>
            <Typography as="span">Grade 7 | Regular</Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {applicantInputMaps.map(section => (
          <FormSection {...section} />
        ))}
      </div>

      {/* <FormSection
        title={applicantInputMaps[0].title}
        details={applicantInputMaps[0].details}
      />

      <FormSection
        title={applicantInputMaps[1].title}
        details={applicantInputMaps[1].details}
      /> */}
    </section>
  );
};

export default ApplicationForm;
