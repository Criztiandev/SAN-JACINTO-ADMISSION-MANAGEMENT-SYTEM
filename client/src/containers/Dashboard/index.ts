import { lazy } from "react";
export { default as ActionHeader } from "./ActionHeader";
export { default as StatsCard } from "./StatsCard";
export { default as StatsSection } from "./StatsSection";

export { default as TabAction } from "./TabAction";
export { default as TabButton } from "./TabButton";
export { default as TabContent } from "./TabContent";

export const AdmissionCalendar = lazy(() => import("./AdmissionCalendar"));
export const SummaryTable = lazy(() => import("./SummaryTable"));
export const LineGraph = lazy(() => import("./LineGraph"));
