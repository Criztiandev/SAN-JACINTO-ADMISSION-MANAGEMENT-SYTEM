import Typography from "./Typography";

interface ColorLableProps {
  title?: string;
  color?: string;
  size?: number;
}

const ColorLabel = ({ title, size = 16, color }: ColorLableProps) => {
  return (
    <span className="flex items-center gap-4">
      <span className={`p-[${size}px] bg-[${color}] rounded-full`}></span>
      <Typography as="p">{title}</Typography>
    </span>
  );
};

export default ColorLabel;
