import { Button, IconButton } from "../../components";
import { ResetIcon, PrevIcon, NextIcon } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useMultipleFormOption } from "../../interface/MultiStep.Type";

interface currentProps {
  stepper: useMultipleFormOption;
}

const RegistrationAction = ({ stepper }: currentProps) => {
  const { removeItem: FormRemove } = useLocalStorage("applicant_form");
  const { removeItem: AddressRemove } = useLocalStorage("address_btn");

  const handleReset = () => {
    FormRemove();
    AddressRemove();
  };

  return (
    <div
      className={`flex items-center ${
        stepper.isFirstStep ? "justify-end" : "justify-between"
      }`}>
      {!stepper.isFirstStep && (
        <Button
          type="button"
          as="outlined"
          dir="left"
          icon={PrevIcon}
          title="Prev"
          onClick={stepper.prevStep}
        />
      )}

      <div className="flex gap-4">
        <IconButton icon={ResetIcon} onClick={handleReset} />

        <Button
          type="submit"
          as="outlined"
          dir="right"
          icon={NextIcon}
          title={`${stepper.isLastStep ? "Finish" : "Next"}`}
        />
      </div>
    </div>
  );
};

export default RegistrationAction;
