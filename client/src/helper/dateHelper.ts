export const DateFormat = (format: string): string => {
  const date = new Date(format);
  if (isNaN(date.getTime())) return "Invalid Date";
  return `${date.toLocaleDateString()}`;
};
