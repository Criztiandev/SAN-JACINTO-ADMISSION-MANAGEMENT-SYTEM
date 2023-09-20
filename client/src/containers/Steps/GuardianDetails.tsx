import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { InputInterface } from "../../interface/componentInterface";
import { useState, ChangeEvent } from "react";
import { ItemSelection } from "../../interface/registrationInterface";
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

const GuardianDetails = () => {
  const [selectedGuardian, setSelectedGuardian] = useState<string>("");
  const GuardianSelection: ItemSelection[] = [
    { cover: "null", title: "Father", subtitle: "Strong" },
    { cover: "null", title: "Mother", subtitle: "Caring" },
    { cover: "null", title: "Other", subtitle: "Prefered" },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGuardian(event.target.value);
  };

  return (
    <section>
      <Typography as="h5" className="pb-2 mb-6  border-b">
        Select your preferred guardian
      </Typography>
      <div className="flex justify-around gap-4 items-center mb-8">
        {GuardianSelection.map(track => (
          <label
            key={track.title}
            className="border cursor-pointer w-[160px] p-4 rounded-[5px]">
            <div className="flex flex-col justify-center items-center gap-4 ">
              <div className="w-16 h-16 rounded-full bg-sky-300"></div>
              <div className="text-center">
                <Typography as="h6">{track.title}</Typography>
                <Typography as="span" className="text-sm text-gray-400">
                  {track.subtitle}
                </Typography>
              </div>
              <input
                className="hidden"
                type="radio"
                name={"guardian"}
                value={track.title}
                onChange={handleChange}
              />
            </div>
          </label>
        ))}
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

        {selectedGuardian === "Other" && (
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
