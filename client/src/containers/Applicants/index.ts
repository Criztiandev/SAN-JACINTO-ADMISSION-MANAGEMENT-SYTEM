import { lazy } from "react";

export const CreateLazyDrawer = lazy(() => import("./CreateDrawer"));
export const DeleteLazyDrawer = lazy(() => import("./DeleteDrawer"));
export const MessageLazyDrawer = lazy(() => import("./MessageDrawer"));

export { default as GradeFilterButton } from "./GradeFilter";
export { default as MoreOptionButton } from "./MoreOption";
export { default as FilterButton } from "./FilterButton";
