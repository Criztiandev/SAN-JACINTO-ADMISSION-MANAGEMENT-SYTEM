import { BaseProps } from "../interface/ComponentInterfaces";
import { Fragment, Header } from "./fragments/Fragments";

interface StackProps extends BaseProps {
  dir: "horizontal" | "vertical";
  spacing: number;
}

const Content = ({ children, dir, spacing }: StackProps) => {
  const flexDir = dir === "horizontal" ? "flex-row" : "flex-col";

  return (
    <div className={`h-full flex ${flexDir} gap-[${spacing}px]  p-6 px-4 `}>
      {children}
    </div>
  );
};

const Stack = ({ children }: BaseProps) => {
  return (
    <div className={`border rounded-[5px] overflow-hidden `}>{children}</div>
  );
};

Stack.Header = Header;
Stack.Items = Fragment;
Stack.Content = Content;

export default Stack;
