import { BaseProps } from "../interface/componentInterface";
interface BadgeProps extends BaseProps {
  type?: "pending" | "accepted"; // Corrected "arhive" to "archive"
  color?: string;
  title: string;
}

const Badge = ({ type = "pending", title }: BadgeProps) => {
  const types = {
    pending: "bg-[#fdaa114d]",
    accepted: "bg-[#00de821b]",
  };

  return (
    <div
      className={`rounded-full capitalize text-[13px] font-medium px-2 py-1 border ${types[type]}`}>
      {title}
    </div>
  );
};

export default Badge;
