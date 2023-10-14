import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { InputInterface } from "../../interface/componentInterface";

const InputTransformer = (name: string): InputInterface[] => [
  {
    label: "House No.",
    name: `addressDetails.${name}.houseNo`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Street",
    name: `addressDetails.${name}.street`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Barangay",
    name: `addressDetails.${name}.barangay`,
    placeholder: "Enter your Barangay",
  },

  {
    label: "Municipality",
    name: `addressDetails.${name}.municipality`,
    placeholder: "Enter your Municipality",
  },

  {
    label: "Province",
    name: `addressDetails.${name}.province`,
    placeholder: "Enter your Province",
  },

  {
    label: "Country",
    name: `addressDetails.${name}.country`,
    placeholder: "Enter your Country",
  },

  {
    label: "Zip Code",
    name: `addressDetails.${name}.zip`,
    placeholder: "Enter your Zip Code",
  },
];

const PermanentAddress = () => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        {InputTransformer("current").map(inputs => (
          <Input key={inputs.label} {...inputs} />
        ))}
      </div>

      <Typography className="my-4 border-b pb-2" as="h5">
        Permanent Address
      </Typography>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {InputTransformer("permanent").map(props => (
          <Input key={props.label} {...props} />
        ))}
      </div>
    </section>
  );
};

export default PermanentAddress;
