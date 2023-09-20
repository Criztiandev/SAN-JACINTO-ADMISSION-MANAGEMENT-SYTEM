import { Typography, Image } from ".";
import { DecreaseIcon, IncreaseIcon } from "../assets/icons";
import { BaseProps, TextProps } from "../interface/componentInterface";
import { Fragment } from "./Fragments";

interface NumberProps extends TextProps {
  value: number | string;
}
interface TypeProps extends TextProps {
  type?: "increase" | "decrease";
  value?: number;
}

const Label = ({ as = "h3", children }: TextProps) => {
  return <Typography as={as}>{children}</Typography>;
};

const Number = ({ as, value }: NumberProps) => {
  return <Typography as={as}>{value}</Typography>;
};

const Type = ({ type = "increase", value, as }: TypeProps) => {
  return (
    <div className="flex gap-4">
      {type === "increase" ? (
        <Image src={IncreaseIcon} alt="Increase" />
      ) : (
        <Image src={DecreaseIcon} alt="decrease" />
      )}
      <Typography as={as}>{value}</Typography>
    </div>
  );
};

const Stats = ({ className, children }: BaseProps) => {
  return <div className={className}>{children}</div>;
};

Stats.Label = Label;
Stats.Number = Number;
Stats.Type = Type;

Stats.Header = Fragment;
Stats.Content = Fragment;
Stats.Helper = Fragment;

export default Stats;
