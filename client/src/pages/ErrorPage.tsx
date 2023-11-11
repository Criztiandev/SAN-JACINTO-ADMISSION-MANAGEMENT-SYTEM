import { useRouteError } from "react-router-dom";
import { Typography } from "../components";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  // change the bg to primary
  return (
    <div className="bg-[#7a0021] w-full h-[100vh] flex justify-center items-center">
      <Typography as="h1" className="text-white">
        Error: Syempre Kwento mo yan Error Tlaga ako dyaan
      </Typography>
    </div>
  );
};

export default ErrorPage;
