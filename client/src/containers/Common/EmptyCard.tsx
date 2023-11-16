const EmptyCard = ({ title }: { title: string }) => {
  return (
    <div className="w-full border h-[200px] bg-gray-400 rounded-[5px] flex justify-center items-center font-bold text-[32px]">
      {title}
    </div>
  );
};

export default EmptyCard;
