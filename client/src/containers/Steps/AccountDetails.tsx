import { Typography, Input } from "../../components";
const AccountDetails = () => {
  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-4">
        <div className="m-auto w-[300px] h-[300px] flex flex-col justify-center items-center gap-4 p-4   rounded-[5px] shadow-md ">
          {/* Logo */}
          <div className="w-32 h-32 rounded-full bg-sky-300"></div>

          {/* Content */}
          <div className="text-center">
            <Typography as="h5">Facebook</Typography>
            <Typography as="span" className="text-sm text-gray-400">
              Social Media Platform
            </Typography>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Input name="facebook" placeholder="Enter your FB Profile Link" />
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
