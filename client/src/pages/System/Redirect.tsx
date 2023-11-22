/* eslint-disable react-hooks/exhaustive-deps */
import useURL from "../../hooks/useURL";
import { useEffect } from "react";

const Redirect = () => {
  const { redirect } = useURL();

  useEffect(() => {
    redirect("/");
  }, []);

  return <></>;
};

export default Redirect;
