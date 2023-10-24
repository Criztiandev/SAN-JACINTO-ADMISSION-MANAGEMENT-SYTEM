import { Dispatch, SetStateAction } from "react";

export interface CardProps {
  cover: string;
  title: string;
  subtitle: string;
}

export interface InputProps {
  type?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface InputSectionProps {
  title: string;
  model: InputProps[] | Array<object>;
  isEdit?: boolean;
}

export interface ItemSelectProps extends CardProps {
  select?: string | null;
  name?: string;
  className?: string;
  onSelect?: Dispatch<SetStateAction<string>> | undefined;
}
