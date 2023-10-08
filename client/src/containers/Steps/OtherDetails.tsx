import Input from "../../components/Input";
import { useState, ChangeEvent } from "react";
import Typography from "../../components/Typography";
import IconButton from "../../components/IconButton";
import QuestionIcon from "../../assets/icons/Question_light.svg";
import { InputInterface } from "../../interface/componentInterface";

interface OtherInterface extends InputInterface {
  state?: string;
  handler: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const OtherDetails = () => {
  const [is4ps, setIs4ps] = useState("No");
  const [isIndi, setIsIndi] = useState("No");
  const [isLWD, setIsLWD] = useState("No");

  const OtherInputTransformer: OtherInterface[] = [
    {
      label: "Are you a 4ps Beneficiary ?",
      name: `otherDetails.is4psBeneficiary`,
      placeholder: "Enter your Reference #",
      state: is4ps,
      handler: event => setIs4ps(event.target.value),
    },

    {
      label: "Are you a Indigenous Person ?",
      name: `otherDetails.isIndigenousPerson`,
      placeholder: "Please Specify",
      state: isIndi,
      handler: event => setIsIndi(event.target.value),
    },

    {
      label: "Are you a LWD Person ?",
      name: `otherDetails.LWD`,
      placeholder: "Please Specify",
      state: isLWD,
      handler: event => setIsLWD(event.target.value),
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-8 items-start  ">
      {OtherInputTransformer.map(props => (
        <div key={props.label}>
          <label
            htmlFor="is4ps"
            className="flex justify-between items-center text-gray-400">
            <Typography as="p">{props.label}</Typography>
            <IconButton className="opacity-[0.5] " icon={QuestionIcon} />
          </label>

          <div
            className={`${
              props.state === "Yes"
                ? "grid grid-cols-[100px_auto] gap-4 items-start"
                : ""
            }`}>
            <select
              className="border px-4 py-3 rounded-[5px]  w-full"
              onChange={props.handler}
              name={`${is4ps !== "Yes" && props.name}`}>
              <option value="">Please Specify</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {props.state === "Yes" && (
              <Input name={props.name} placeholder={props.placeholder} />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OtherDetails;
