import { lazy } from "react";

export const LandingPage = lazy(() => import("./LandingPage.tsx"));
export const RegisterPage = lazy(() => import("./Register.tsx"));
export const LoginPage = lazy(() => import("./LoginPage.tsx"));

export const ErrorPage = lazy(() => import("./ErrorPage.tsx"));

export const DashboardPage = lazy(() => import("./Dashboard.tsx"));
export const ApplicantPage = lazy(() => import("./Applicant.tsx"));
export const AnnoucementPage = lazy(() => import("./Annoucement.tsx"));
export const SchedulePage = lazy(() => import("./Schedule.tsx"));
export const ExaminiesPage = lazy(() => import("./Examiniees.tsx"));
export const MasterListPage = lazy(() => import("./MasterList.tsx"));
export const ProfilePage = lazy(() => import("./Profile.tsx"));
