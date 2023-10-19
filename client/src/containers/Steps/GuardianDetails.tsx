import { useState } from "react";
import Carousel from "../../components/Carousel";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { ItemSelection } from "../../interface/registrationInterface";
import ItemSelect from "../Form/ItemSelect";
import {
  fatherInputDetails,
  legalGuardianInputDetails,
  motherInputDetails,
} from "../../helper/applicantFormObject";

const GuadianChoices: ItemSelection[] = [
  { cover: "null", title: "Father", subtitle: "Strong" },
  { cover: "null", title: "Mother", subtitle: "Caring" },
  { cover: "null", title: "Other", subtitle: "Prefered" },
];

const GuardianDetails = () => {
  const [selectedGuardian, setSelectedGuardian] = useState("");

  return (
    <section>
      <div className="flex justfiy-center items-center flex-col mb-4">
        <Carousel>
          {GuadianChoices.map(props => (
            <ItemSelect
              key={props.title}
              {...props}
              select={selectedGuardian}
              onSelect={setSelectedGuardian}
              name="studentDetails.choosen"
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
          {fatherInputDetails.map(props => (
            <Input key={props.label} {...props} />
          ))}
        </div>

        <Typography as="h5" className="pt-4 pb-2 border-b">
          Mother Details
        </Typography>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {motherInputDetails.map(props => (
            <Input {...props} />
          ))}
        </div>

        {selectedGuardian === "Other" && (
          <>
            <Typography as="h5" className="pb-2 border-b">
              Prefered Guardian Details
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              {legalGuardianInputDetails.map(props => (
                <Input {...props} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GuardianDetails;
