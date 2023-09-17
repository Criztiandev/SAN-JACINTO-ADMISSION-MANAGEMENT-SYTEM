import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../containers/ErrorPage";
import Applicant from "../pages/Applicant";
import Schedule from "../pages/Schedule";
import Message from "../pages/Message";
import Tools from "../pages/Tools";
import LadingPage from "../pages/LadingPage";
import Register from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import CheckPoint from "../pages/CheckPoint";

export const router = createBrowserRouter([
  { path: "/", element: <LadingPage />, errorElement: <ErrorPage /> },
  { path: "/register", element: <Register />, errorElement: <ErrorPage /> },
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "/checkpont", element: <CheckPoint />, errorElement: <ErrorPage /> },
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
