/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Redirect from "../pages/System/Redirect";
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const CheckPointPage = lazy(() => import("../pages/Checkpoint"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPassword"));

export const publicRoutes = createBrowserRouter([
  { path: "/admission", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <LandingPage /> },
  { path: "/checkpoint", element: <CheckPointPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },
]);
