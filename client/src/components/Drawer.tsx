import { BaseProps } from "../interface/componentInterface";

interface DrawerProps extends BaseProps {
  data?: Array<object>;
  anchor?: "left" | "right";
}

const Drawer = ({ anchor = "right", children }: DrawerProps) => {
  const anchorDir = {
    left: "float-left",
    right: "float-right",
  };

  return (
    <div className="fixed w-full h-full bg-[#00000080] top-0 z-50 overflow">
      <div className={`w-[300px] border h-full bg-white ${anchorDir[anchor]}`}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
