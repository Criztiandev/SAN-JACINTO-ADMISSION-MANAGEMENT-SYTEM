import { useState } from "react";
import { InputProps, InputSectionProps } from "../../interface/FormInterface";
import { IconButton, Input } from "../../components";
import { DecreaseIcon } from "../../assets/icons/index";

const InputSections = ({ title, details }: InputSectionProps) => {
  const [hide, setHide] = useState(true);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide(prev => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            icon={DecreaseIcon}
            onClick={() => setHide(prev => !prev)}
          />
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {details?.map((props: InputProps) => (
            <Input key={props.label} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSections;
