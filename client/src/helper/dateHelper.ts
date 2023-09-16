/* eslint-disable @typescript-eslint/no-explicit-any */

const options: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const DateFormat = (format: string): string => {
  const date = new Date(format);
  if (isNaN(date.getTime())) return "Invalid Date";
  return `${date.toLocaleDateString(undefined, options)}`;
};

export const getCurrentDateInTimeZone = () =>
  new Date().toLocaleDateString(undefined, options);
