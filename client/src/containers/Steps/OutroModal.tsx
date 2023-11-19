import Button from "../../components/Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface OutrModalProps {
  data: any;
  onNext: () => void;
}

const OutroModal = ({ data, onNext }: OutrModalProps) => {
  const { title, desc } = data;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center ">
      <div className="w-[600px] h-[400px] bg-white rounded-[5px] p-4 flex justify-center items-center flex-col gap-4">
        <div className="w-[120px] h-[120px] border rounded-full bg-blue-400"></div>

        <div className="text-center max-w-[400px]">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <Button type="button" title="Next" onClick={onNext} />
      </div>
    </div>
  );
};

export default OutroModal;
