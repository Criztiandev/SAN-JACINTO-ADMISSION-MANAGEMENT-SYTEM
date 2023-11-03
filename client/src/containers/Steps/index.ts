import { lazy } from "react";

export const GradeLevel = lazy(() => import("./GradeLevel"));
export const GradeDetails = lazy(() => import("./GradeDetails"));
export const StudentDetails = lazy(() => import("./StudentDetails"));
export const PersonalDetails = lazy(() => import("./PersonalDetails"));
export const PermanentAddress = lazy(() => import("./PermanentAddress"));
export const GuardianDetails = lazy(() => import("./GuardianDetails"));
export const OtherDetails = lazy(() => import("./OtherDetails"));
export const ApplicationForm = lazy(() => import("./ApplicationForm"));
export const Outro = lazy(() => import("./Outro"));
