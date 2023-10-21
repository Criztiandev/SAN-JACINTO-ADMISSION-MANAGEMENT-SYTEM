import { useState } from "react";
import Carousel from "../../components/Carousel";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { Typography } from "../../components";
import ItemSelect from "../Form/ItemSelect";
import { InputProps } from "../../interface/FormInterface";
import {
  personalDetailsInputModel,
  suffixes,
} from "../../helper/applicantFormObject";
import { OmitInputObject } from "../../utils/OmitUtils";
import { GenderSelectionItems } from "../../helper/registrationForm.Helper";

const firstSection: InputProps[] = OmitInputObject(
  [
    "Suffix",
    "Birth Date",
    "Age",
    "Email",
    "Contact",
    "Facebook Link",
    "Mother Tounge",
    "Gender",
  ],
  personalDetailsInputModel
);

const secondSection: InputProps[] = OmitInputObject(
  ["First Name", "Middle Name", "Last Name", "Suffix", "Gender"],
  personalDetailsInputModel
);

const PersonalDetails = () => {
  const [genderSelect, setGenderSelect] = useState("");
  return (
    <section className="flex flex-col gap-4 mb-4">
      <div className="flex justify-center items-center flex-col">
        <Carousel direction="center">
          {GenderSelectionItems.map(props => (
            <ItemSelect
              key={props.title}
              {...props}
              select={genderSelect}
              onSelect={setGenderSelect}
              name="personalDetails.gender"
            />
          ))}
        </Carousel>

        <Typography as="span" className="text-gray-400 pb-2 mt-4">
          Please Select Your Preffered Gender
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center">
        {firstSection.map(props => (
          <Input {...props} />
        ))}

        <Select
          label="Suffix"
          name="personalDetails.suffix"
          className="bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-[100px]">
          <option value={""}>N/A</option>
          {suffixes.map(suff => (
            <option value={suff}>{suff}</option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center mb-4">
        {secondSection.map(props => (
          <Input {...props} />
        ))}
      </div>
    </section>
  );
};

export default PersonalDetails;
