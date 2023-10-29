import { lazy } from "react";
export { default as ActionHeader } from "./ActionHeader";
export { default as StatsCard } from "./StatsCard";
export { default as StatsSection } from "./StatsSection";
export const AdmissionCalendar = lazy(() => import("./AdmissionCalendar"));
