import { OptionItem } from "./Component.Type";
import { MouseEvent } from "react";
export interface FilterButtonProps {
  as?: "outlined" | "contained" | "ghost";
  title: string;
  icon: string;
  option: OptionItem[];
  disabled?: boolean;
  onToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
