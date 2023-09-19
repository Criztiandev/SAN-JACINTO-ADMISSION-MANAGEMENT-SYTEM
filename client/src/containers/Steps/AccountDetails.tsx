import { useState } from "react";
import IconButton from "../../components/IconButton";
import Typography from "../../components/Typography";
import ArrowLeft from "../../assets/icons/Expand_left_light.svg";
import ArrowRight from "../../assets/icons/Expand_right_light.svg";

const AccountDetails = () => {
  const platforms = [
    {
      icon: "blue",
      title: "Facebook",
      sub: "Social Media Platform",
    },
    {
      icon: "red",
      title: "Gmail",
      sub: "Emailing Platform",
    },
  ];
  const [pageIndex, setPageIndex] = useState(0);

  console.log(platforms[0]);

  const handleNextPage = () =>
    setPageIndex(prev => (prev >= platforms.length - 1 ? prev : prev + 1));

  const handlePrevPage = () =>
    setPageIndex(prev => (prev <= 0 ? prev : prev - 1));

  return (
    <section className="">
      <div className="flex justify-between items-center">
        <IconButton type="outlined" onClick={handlePrevPage} icon={ArrowLeft} />

        <div className="cursor-pointer  m-auto w-[300px] h-[300px] flex flex-col justify-center items-center gap-4 p-4 border border-gray-500 rounded-[5px]">
          {/* Logo */}
          <div className="w-32 h-32 rounded-full bg-sky-300"></div>

          {/* Content */}
          <div className="text-center">
            <Typography as="h6">{platforms[pageIndex].title}</Typography>
            <Typography as="span" className="text-sm text-gray-400">
              {platforms[pageIndex].sub}
            </Typography>
          </div>
        </div>

        <IconButton
          as="button"
          type="outlined"
          onClick={handleNextPage}
          icon={ArrowRight}
        />
      </div>
    </section>
  );
};

export default AccountDetails;
