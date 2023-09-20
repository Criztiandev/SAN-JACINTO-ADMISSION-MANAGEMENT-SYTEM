import { BaseProps } from "../interface/componentInterface";
import { Fragment } from "./Fragments";

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

Stack.Items = Fragment;
Stack.Content = Content;

export default Stack;
