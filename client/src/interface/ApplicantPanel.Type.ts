import { OptionItem } from "./Component.Type";

export interface FilterButtonProps {
  title: string;
  icon: string;
  option: OptionItem[];
  disabled?: true;
}
