import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { useState } from "react";
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
  const [hasCurrentAddress, setHasCurrentAddress] = useState<boolean>(false);

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        {InputTransformer("permanentAddress").map(inputs => (
          <Input key={inputs.label} {...inputs} />
        ))}
      </div>
      <label className="flex gap-4 py-4">
        <input
          type="checkbox"
          onClick={() => setHasCurrentAddress(prev => !prev)}
        />
        <Typography as="span">Do you currently have an address?</Typography>
      </label>

      {hasCurrentAddress && (
        <>
          <Typography className="my-4 border-b pb-2" as="h5">
            Current Address
          </Typography>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {InputTransformer("currentAddress").map(props => (
              <Input key={props.label} {...props} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PermanentAddress;
