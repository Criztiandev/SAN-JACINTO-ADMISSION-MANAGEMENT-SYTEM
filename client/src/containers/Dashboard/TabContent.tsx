/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";

interface TabContentProps {
  selected: string;
}
interface PanelItem {
  key?: string;
  title: string;
  Component: any;
}

const PanelList: PanelItem[] = [
  {
    key: "Graph",
    title: "Applicant Graph",
    Component: lazy(() => import("./GraphComponent")),
  },
  {
    key: "Admission",
    title: "Admission Calendar",
    Component: lazy(() => import("./AdmissionCalendar")),
  },
  {
    key: "Applicant",
    title: "Recent Applicant Table",
    Component: lazy(() => import("./SummaryTable")),
  },
];

const TabContent = ({ selected }: TabContentProps) => {
  const { title, Component } = PanelList.find(
    (e: PanelItem) => e.key === selected
  ) || {
    title: "",
    Component: null,
  };
  return (
    <div className="relative border w-full h-[400px] rounded-[5px] flex flex-col gap-2 overflow-hidden">
      <div className="w-full bg-gray-300 px-2">
        <h3 className="p-2">{title || "Title"}</h3>
      </div>
      <Suspense fallback={<div>Loading</div>}>{<Component />}</Suspense>
    </div>
  );
};

export default TabContent;
