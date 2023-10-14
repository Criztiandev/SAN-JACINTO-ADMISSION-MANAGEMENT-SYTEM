import Input from "../../components/Input";
import { InputInterface } from "../../interface/componentInterface";

const OtherDetails = () => {
  const OtherInputTransformer: InputInterface[] = [
    {
      label: "Are you a 4ps Beneficiary ?",
      name: `otherDetails.is4psBeneficiary`,
      placeholder: "Enter your Reference #",
    },

    {
      label: "Are you a Indigenous Person ?",
      name: `otherDetails.isIndigenousPerson`,
      placeholder: "Please Specify",
    },

    {
      label: "Are you a LWD Person ?",
      name: `otherDetails.isLWD`,
      placeholder: "Please Specify",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-8 items-start  ">
      {OtherInputTransformer.map(props => (
        <Input {...props} />
      ))}
    </section>
  );
};

export default OtherDetails;
