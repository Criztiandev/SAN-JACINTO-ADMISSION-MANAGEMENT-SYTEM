import { InputProps } from "../interface/FormInterface";

export const OmitInputObject = (
  target: Array<string> | string,
  object: Array<InputProps>
) => {
  return object.filter(items => {
    const { label } = items;
    if (typeof target === "string") return items !== label;

    return !target.includes(label || "");
  });
};
