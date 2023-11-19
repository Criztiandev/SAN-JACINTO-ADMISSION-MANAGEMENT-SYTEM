import { RouterProvider } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { useAuthContext } from "../context/AuthContext";
import { Suspense } from "react";
import Loading from "../components/Loading";

const Routes = () => {
  const { user } = useAuthContext();

  if (user) return <RouterProvider router={privateRoutes} />;
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={publicRoutes} />
    </Suspense>
  );
};

export default Routes;
