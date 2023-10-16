import { createBrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "../pages";

export const publicRoutes = createBrowserRouter([
  { path: "/admission", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <LandingPage /> },
]);
