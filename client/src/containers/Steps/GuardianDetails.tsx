import { useState } from "react";
import Carousel from "../../components/Carousel";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { InputInterface } from "../../interface/componentInterface";
import { ItemSelection } from "../../interface/registrationInterface";
import RadioItems from "../Register/RadioItems";
import { useFormikContext } from "formik";

const getGuardianInput = (name: string): InputInterface[] => [
  {
    label: `First Name`,
    name: `guardianDetails.${name}.firstName`,
    placeholder: `Enter your their first name`,
  },
  {
    label: "Middle Name",
    name: `guardianDetails.${name}.middleName`,
    placeholder: `Enter your their middle name`,
  },
  {
    label: "Last Name",
    name: `guardianDetails.${name}.lastName`,
    placeholder: `Enter your their last name`,
  },
  {
    label: "Contact",
    name: `guardianDetails.${name}.contact`,
    placeholder: `Enter your their contact number`,
  },
];

const GuadianChoices: ItemSelection[] = [
  { cover: "null", title: "Father", subtitle: "Strong" },
  { cover: "null", title: "Mother", subtitle: "Caring" },
  { cover: "null", title: "Other", subtitle: "Prefered" },
];

const GuardianDetails = () => {
  const [selectedGuardian, setSelectedGuardian] = useState(-1);
  const parentChoice = ["Father", "Mother", "Legal"];

  return (
    <section>
      <div className="flex justfiy-center items-center flex-col mb-4">
        <Carousel>
          {GuadianChoices.map((items, index) => (
            <RadioItems
              {...items}
              index={index}
              state={selectedGuardian}
              name="guardianDetails.choosen"
              handleSelect={() => setSelectedGuardian(index)}
            />
          ))}
        </Carousel>

        <Typography as="span" className="text-gray-400 pb-2 mt-4">
          Please Select Your Preffered Guardian
        </Typography>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <Typography as="h5" className="pb-2  border-b">
          Father Details
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          {getGuardianInput("father").map(props => (
            <Input key={props.label} {...props} />
          ))}
        </div>

        <Typography as="h5" className="pt-4 pb-2 border-b">
          Mother Details
        </Typography>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {getGuardianInput("mother").map(props => (
            <Input key={props.label} {...props} />
          ))}
        </div>

        {parentChoice[selectedGuardian] === "Legal" && (
          <>
            <Typography as="h5" className="pb-2 border-b">
              Prefered Guardian Details
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              {getGuardianInput("legalGuardian").map(props => (
                <Input key={props.label} {...props} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GuardianDetails;
