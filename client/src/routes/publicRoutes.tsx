import { createBrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "../pages";
import Checkpoint from "../pages/Checkpoint";
import ForgotPassword from "../pages/ForgotPassword";

export const publicRoutes = createBrowserRouter([
  { path: "/admission", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <LandingPage /> },
  { path: "/checkpoint", element: <Checkpoint /> },
  { path: "/forgot", element: <ForgotPassword /> },
]);
