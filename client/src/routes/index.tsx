import { RouterProvider } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { useAuthContext } from "../context/AuthContext";
import { Suspense } from "react";
import { Loading } from "../components";
const Routes = () => {
  const { user } = useAuthContext();

  if (user)
    return (
      <Suspense fallback={<Loading />}>
        <RouterProvider router={privateRoutes} />
      </Suspense>
    );
  return <RouterProvider router={publicRoutes} />;
};

export default Routes;
