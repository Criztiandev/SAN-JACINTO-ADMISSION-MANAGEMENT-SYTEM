import { ComponentProps, TypographyProps } from "../interface/CommonInterface";
import Typography from "./Typography";
import Fragment from "./Fragment";

interface NumberProps extends TypographyProps {
  value: number | string;
}
interface TypeProps extends TypographyProps {
  type?: "increase" | "decrease";
  value?: number;
}

const Label = ({ as = "h3", children }: TypographyProps) => {
  return <Typography as={as}>{children}</Typography>;
};

const Number = ({ as, value }: NumberProps) => {
  return <Typography as={as}>{value}</Typography>;
};

const Type = ({ type = "increase", value, as }: TypeProps) => {
  return (
    <div className="flex gap-4">
      {type === "increase" ? <span>Increase</span> : <span>Decrease</span>}
      <Typography as={as}>{value}</Typography>
    </div>
  );
};

const Stats = ({ className, children }: ComponentProps) => {
  return <div className={className}>{children}</div>;
};

Stats.Label = Label;
Stats.Number = Number;
Stats.Type = Type;

Stats.Header = Fragment;
Stats.Content = Fragment;
Stats.Helper = Fragment;

export default Stats;
