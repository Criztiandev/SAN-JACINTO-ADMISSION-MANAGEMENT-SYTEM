import { BaseProps } from "../interface/componentInterface";

interface BadgeProps extends BaseProps {
  title: string;
}

const Badge = ({ title }: BadgeProps) => {
  return (
    <div className="rounded-full capitalize  text-[13px] font-medium px-2 py-1 border border-green-400 bg-[#00de821b]">
      {title}
    </div>
  );
};

export default Badge;
