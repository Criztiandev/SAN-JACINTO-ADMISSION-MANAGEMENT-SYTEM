import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../containers/ErrorPage";
import Applicant from "../pages/Applicant";
import Schedule from "../pages/Schedule";
import Message from "../pages/Message";
import Tools from "../pages/Tools";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/applicants",
    element: <Applicant />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/schedule",
    element: <Schedule />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/message",
    element: <Message />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/tools",
    element: <Tools />,
    errorElement: <ErrorPage />,
  },
]);
