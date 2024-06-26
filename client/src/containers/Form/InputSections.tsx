import { useState } from "react";
import { InputProps, InputSectionProps } from "../../interface/FormInterface";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";

import DecreaseIcon from "../../assets/icons/Expand_down_light.svg";
import EditIcon from "../../assets/icons/Edit_light.svg";

const InputSections = ({
  title,
  model,
  hidden = true,
  disable,
}: InputSectionProps) => {
  const [hideSection, setHideSection] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const handleHideSection = () => setHideSection((prev) => !prev);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4 select-none">
        <h4 className="cursor-pointer" onClick={handleHideSection}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            as="outlined"
            icon={DecreaseIcon}
            onClick={handleHideSection}
          />

          {!hidden && (
            <IconButton
              icon={EditIcon}
              onClick={() => setIsEdit((prev) => !prev)}
            />
          )}
        </div>
      </div>

      {hideSection && (
        <div className="grid grid-cols-2 gap-4">
          {model?.map((props: InputProps) => (
            <Input
              key={props.label}
              {...props}
              disabled={disable ? disable : isEdit}
              className={`bg-black`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSections;
