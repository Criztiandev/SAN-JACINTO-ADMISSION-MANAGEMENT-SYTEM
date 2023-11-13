/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy, ComponentType } from "react";
import FetchLoader from "../General/FetchLoader";
import Skeleton from "react-loading-skeleton";
interface TabContentProps {
  selected: string;
  pending: boolean;
}
interface PanelItem {
  key?: string;
  title: string;
  Component: ComponentType<any>;
}

const PanelList: PanelItem[] = [
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
const TabContent = ({ selected, pending }: TabContentProps) => {
  const found: any = PanelList.find((e: PanelItem) => e.key === selected);

  // Button Icon Pending
  if (pending) return <Skeleton height={48} />;

  const { title, Component } = found;

  return (
    <div className="relative border w-full rounded-[5px] flex flex-col gap-2 overflow-hidden h-full">
      <div className="w-full bg-gray-300 px-2">
        <h3 className="p-2">{title || "Title"}</h3>
      </div>
      <Suspense fallback={<FetchLoader />}>{<Component />}</Suspense>
    </div>
  );
};

export default TabContent;
