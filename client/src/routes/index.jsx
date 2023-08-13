import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>HI</h1>,
    errorElement: <ErrorPage />,
  },
]);

export default router;
