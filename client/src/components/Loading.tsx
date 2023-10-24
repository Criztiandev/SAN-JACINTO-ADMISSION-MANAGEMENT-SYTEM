import BarLoader from "./BarLoader";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-content-center bg-[#920317] px-4 py-24 h-full">
      <BarLoader />
    </div>
  );
};

export default Loading;
