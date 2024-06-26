import Typography from "../../components/Typography";
import { RegistrationStepper } from "../../helper/Admission.Helper";
interface RegistrationHeaderProps {
  steps: number;
}

const RegistrationHeader = ({ steps }: RegistrationHeaderProps) => {
  const { title } = RegistrationStepper[steps];

  return (
    <section className="flex items-center justify-between border-b p-2">
      <Typography as="h3" className="font-bold">
        {title}
      </Typography>
      <span className="">
        {steps + 1} / {RegistrationStepper.length}
      </span>
    </section>
  );
};

export default RegistrationHeader;
