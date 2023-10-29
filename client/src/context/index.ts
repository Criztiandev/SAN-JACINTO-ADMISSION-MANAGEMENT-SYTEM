import { lazy } from "react";

export const TableProvider = lazy(() => import("../context/TableContext.tsx"));
export const ScheduleProvider = lazy(
  () => import("../context/ScheduleContext.tsx")
);
