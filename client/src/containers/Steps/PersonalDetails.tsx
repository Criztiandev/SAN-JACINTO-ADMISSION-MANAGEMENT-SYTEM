import { useState } from "react";
import Carousel from "../../components/Carousel";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { InputInterface } from "../../interface/componentInterface";
import { ItemSelection } from "../../interface/registrationInterface";
import RadioItems from "../Register/RadioItems";
import { Typography } from "../../components";

const parentName = "personalDetails";

const suffixes = [
  "Jr.",
  "Sr.",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];

const gendersArr: ItemSelection[] = [
  {
    cover: "",
    title: "Male",
    subtitle: "Masculine",
  },
  {
    cover: "",
    title: "Female",
    subtitle: "Feminine",
  },
];

const firstSection: InputInterface[] = [
  {
    label: "First Name",
    name: `${parentName}.firstName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Middle Name",
    name: `${parentName}.middleName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Last Name",
    name: `${parentName}.lastName`,
    placeholder: "Enter your First Name",
  },
];

const secondSection: InputInterface[] = [
  {
    type: "date",
    label: "Birth Date",
    name: "personalDetails.birthDate",
  },
  {
    type: "number",
    label: "Age",
    name: "personalDetails.age",
    placeholder: "Enter your Age",
  },
  {
    type: "email",
    label: "Email",
    name: "personalDetails.email",
    placeholder: "Enter your @email",
  },

  {
    type: "number",
    label: "Contact",
    name: "personalDetails.contact",
    placeholder: "Enter your phone number",
  },

  {
    label: "Mother Tounge",
    name: "personalDetails.motherTounge",
    placeholder: "Enter",
  },
];

const PersonalDetails = () => {
  const [genderSelect, setGenderSelect] = useState(-1);
  return (
    <section className="flex flex-col gap-4 mb-4">
      <div className="flex justify-center items-center flex-col">
        <Carousel>
          {gendersArr.map((gender, index) => (
            <RadioItems
              {...gender}
              index={index}
              state={genderSelect}
              name="personalDetails.gender"
              handleSelect={() => setGenderSelect(index)}
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
