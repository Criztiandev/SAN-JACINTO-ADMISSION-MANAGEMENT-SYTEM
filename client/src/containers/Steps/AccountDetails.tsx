import Typography from "../../components/Typography";
import SeachIcon from "../../assets/icons/Search.svg";
import IconButton from "../../components/IconButton";
import { useState } from "react";
const AccountDetails = () => {
  const [searchAccount, setSearchAccount] = useState("");

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

        <div className="flex gap-4 items-center">
          <input
            type="text"
            className="py-2 px-4 rounded-[5px] border border-gray-300 outline-none"
            value={searchAccount}
            onChange={e => setSearchAccount(e.target.value)}
          />
          <IconButton icon={SeachIcon} type="outlined" />
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
