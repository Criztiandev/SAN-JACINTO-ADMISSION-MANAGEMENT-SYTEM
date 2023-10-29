import { lazy } from "react";

export const Avatar = lazy(() => import("./Avatar.tsx"));

export const Badge = lazy(() => import("./Badge.tsx"));
export const Button = lazy(() => import("./Button.tsx"));

export const Calendar = lazy(() => import("./Calendar.tsx"));
export const Carousel = lazy(() => import("./Carousel.tsx"));

export const Drawer = lazy(() => import("./Drawer.tsx"));
export const Dropdown = lazy(() => import("./Dropdown.tsx"));
export const IconButton = lazy(() => import("./IconButton.tsx"));
export const Image = lazy(() => import("./Image.tsx"));
export const Input = lazy(() => import("./Input.tsx"));
export const SearchBar = lazy(() => import("./SearchBar.tsx"));
export const Select = lazy(() => import("./Select.tsx"));
export const Table = lazy(() => import("./Table.tsx"));
export const Typography = lazy(() => import("./Typography.tsx"));
export const Radio = lazy(() => import("./Radio.tsx"));
export const TextAre = lazy(() => import("./Textarea.tsx"));

export { default as Loading } from "./Loading.tsx";
export { default as BarLoader } from "./BarLoader.tsx";
