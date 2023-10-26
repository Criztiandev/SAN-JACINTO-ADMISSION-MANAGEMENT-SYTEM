import { useEffect, useState } from "react";
import { InputProps, InputSectionProps } from "../../interface/FormInterface";
import { IconButton, Input } from "../../components";
import { DecreaseIcon, EditIcon } from "../../assets/icons/index";

const InputSections = ({
  title,
  model,
  isEdit,
  hidden = true,
}: InputSectionProps) => {
  const [hide, setHide] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit) setEdit(true);

    return () => {
      setEdit(false);
    };
  }, [isEdit]);

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

          {!hidden && (
            <IconButton
              icon={EditIcon}
              onClick={() => setEdit(prev => !prev)}
            />
          )}
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {model?.map((props: InputProps) => (
            <Input key={props.label} {...props} disabled={edit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSections;
