import { lazy } from "react";
export { default as NavigationBar } from "./Nav";

export { default as Footer } from "./Footer";
export { default as Header } from "./Header";

export const RegistrationLayout = lazy(() => import("./RegistrationLayout"));
export const BaseLayout = lazy(() => import("./BaseLayout"));
