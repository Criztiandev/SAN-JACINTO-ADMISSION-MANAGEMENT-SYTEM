import Typography from "../components/Typography";
import { BaseProps } from "../interface/Common.Types";
import { CommonLayoutProps } from "../interface/Layout.Types";

const Header = ({ children, ...props }: BaseProps) => {
  return <header {...props}>{children}</header>;
};
const HeaderLayout = ({
  title,
  subtitle,
  children,
  className,
}: CommonLayoutProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();

  const formattedDate = `${days[date.getDay() - 1]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <header className="flex justify-between items-center">
      <span>
        <Typography as="h1" className="bold">
          {title}
        </Typography>

        <Typography as="small" className="font-medium text-gray-600 ">
          {!subtitle ? `📅 ${formattedDate} | 🕕 ${formattedTime}` : subtitle}
        </Typography>
      </span>

      <span className={`flex gap-4 ${className || ""}`}>{children}</span>
    </header>
  );
};

Header.Layout = HeaderLayout;

export default Header;
