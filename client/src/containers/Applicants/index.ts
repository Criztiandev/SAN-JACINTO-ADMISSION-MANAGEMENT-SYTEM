import { lazy } from "react";

export const CreateLazyDrawer = lazy(() => import("./CreateDrawer"));
export const ViewLazyDrawer = lazy(() => import("./ViewDrawer"));
export const UpdateLazyDrawer = lazy(() => import("./EditDrawer"));
export const DeleteLazyDrawer = lazy(() => import("./DeleteDrawer"));
export const MessageLazyDrawer = lazy(() => import("./MessageDrawer"));

export { default as GradeFilterButton } from "./GradeFilter";
export { default as StatusFilterButton } from "./StatusFilter";
export { default as MoreOptionButton } from "./MoreOption";
