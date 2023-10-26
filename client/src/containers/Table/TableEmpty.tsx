import { BarLoader } from "../../components";

interface TableEmptyProps {
  title: string;
}

const TableEmpty = ({ title = "Loading" }: TableEmptyProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-[rgba(152,152,152,0.7)] w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <span className=" text-[42px] font-bold text-white capitalize">
          {title}
        </span>
        <BarLoader />
      </div>
    </div>
  );
};

export default TableEmpty;
