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
}

export interface InputSectionProps {
  title: string;
  details?: InputProps[] | Array<object>;
}

export interface ItemSelectProps extends CardProps {
  select: string;
  name?: string;
  className?: string;
  onSelect?: Dispatch<SetStateAction<string>>;
}
