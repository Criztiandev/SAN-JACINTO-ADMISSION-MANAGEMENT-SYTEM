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

  hidden?: boolean;
  disable?: boolean;
}

export interface ItemSelectProps extends CardProps {
  name?: string;
  className?: string;
  value?: string | number;
  active?: boolean;
}
