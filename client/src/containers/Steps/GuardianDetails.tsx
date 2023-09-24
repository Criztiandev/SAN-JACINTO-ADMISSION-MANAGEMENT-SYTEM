import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { InputInterface } from "../../interface/componentInterface";
import { ItemSelection } from "../../interface/registrationInterface";
import useRadioSelect from "../../hooks/userRadioSelect";
import { Radio } from "../../components";

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

const GuardianSelection: ItemSelection[] = [
  { cover: "null", title: "Father", subtitle: "Strong" },
  { cover: "null", title: "Mother", subtitle: "Caring" },
  { cover: "null", title: "Other", subtitle: "Prefered" },
];

const GuardianDetails = () => {
  const { data, currentSelectedIndex, handleSelectItem } =
    useRadioSelect(GuardianSelection);
  return (
    <section>
      <Typography as="h5" className="pb-2 mb-6  border-b">
        Select your preferred guardian
      </Typography>
      <Radio.Select.Group className="flex justify-around gap-4 items-center mb-8">
        {data.map((item, index) => (
          <Radio.Select.Item
            key={item.title}
            name="studentDetails.yearLevel"
            id={item.title}
            value={item.title}
            onClick={() => handleSelectItem(index)}
            className={`cursor-pointer w-[200px] py-12 border flex flex-col justify-center items-center gap-4 rounded-[5px] ${
              index === currentSelectedIndex ? "border-2 border-black" : ""
            }`}>
            <div className="w-[6vw] h-[6vw] rounded-full bg-sky-300"></div>
            <div className="text-center">
              <Typography as="h5">{item.title}</Typography>
              <Typography as="span" className="text-sm text-gray-400">
                {item.subtitle}
              </Typography>
            </div>
          </Radio.Select.Item>
        ))}
      </Radio.Select.Group>

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

        {currentSelectedIndex === 2 && (
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
