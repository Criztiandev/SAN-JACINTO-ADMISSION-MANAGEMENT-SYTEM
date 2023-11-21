import useURL from "../../hooks/useURL";
import { useEffect } from "react";

const Redirect = () => {
  const { redirect } = useURL();

  useEffect(() => {
    redirect("/");
  }, []);

  return <div>Redirect</div>;
};

export default Redirect;
