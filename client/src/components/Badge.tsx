/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "../interface/Component.Type";

interface BadgeProps extends BaseProps {
  as: "neutral" | "stats";
  type?: string;
  color?: string;
  title?: string;
}

const Badge = ({
  as = "neutral",
  type = "pending",
  title,
  children,
  color,
}: BadgeProps) => {
  const typeClasses: any = {
    neutral: {
      pending: "bg-[#fdaa114d]",
      accepted: "bg-[#00de821b]",
    },
    stats: {
      increase: "bg-[#00de821b]",
      decrease: "bg-[#de00001b]",
    },
  };

  const badgeClass = typeClasses[as]?.[type] || color;

  return (
    <div
      className={`${badgeClass} rounded-full capitalize text-[13px] font-medium px-2 py-1 border flex gap-2`}>
      {title || children}
    </div>
  );
};

export default Badge;
