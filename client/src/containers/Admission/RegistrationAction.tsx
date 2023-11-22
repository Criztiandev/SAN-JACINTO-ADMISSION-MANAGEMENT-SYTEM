import Button from "../../components/Button";
import PrevIcon from "../../assets/icons/Expand_left_light.svg";
import NextIcon from "../../assets/icons/Expand_right_light.svg";
import { useMultipleFormOption } from "../../interface/MultiStep.Type";

interface currentProps {
  stepper: useMultipleFormOption;
  isThrottled: boolean;
}

const RegistrationAction = ({ stepper, isThrottled }: currentProps) => {
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
        <Button
          type="submit"
          as="outlined"
          dir="right"
          icon={NextIcon}
          title={`${stepper.isLastStep ? "Finish" : "Next"}`}
          disabled={isThrottled}
        />
      </div>
    </div>
  );
};

export default RegistrationAction;
