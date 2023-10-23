interface TableEmptyProps {
  title: string;
}

const TableEmpty = ({ title }: TableEmptyProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-[rgba(206,206,206,0.5)] w-full h-full">
      <span className="font-bold text-4xl">{title}</span>
    </div>
  );
};

export default TableEmpty;
