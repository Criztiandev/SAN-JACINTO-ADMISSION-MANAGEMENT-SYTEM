/* eslint-disable @typescript-eslint/no-explicit-any */
export const options: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "short",
  day: "numeric",
};

interface DateFormatProps {
  format: string | Date;
  reverse: boolean;
}

export const DateFormat = ({
  format,
  reverse = false,
}: DateFormatProps): string => {
  const date = !reverse ? new Date(format) : (format as Date); // Explicit type assertion
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString(undefined, options);
};

export const getCurrentDateInTimeZone = () =>
  new Date().toLocaleDateString(undefined, options);
