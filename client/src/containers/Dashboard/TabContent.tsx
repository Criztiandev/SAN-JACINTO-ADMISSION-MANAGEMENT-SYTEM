/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy, ComponentType } from "react";
import FetchLoader from "../General/FetchLoader";
import { toast } from "react-toastify";
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

  if (!found) {
    toast.error("Content Doesnt Exist");
    <FetchLoader />;
  }

  if (pending) {
    return (
      <div className="relative border w-full h-[400px] rounded-[5px] flex flex-col gap-2 overflow-hidden">
        <div className="w-full bg-gray-300 px-2">
          <h3 className="p-2">{"Pending"}</h3>
        </div>
        <FetchLoader />
      </div>
    );
  }

  const { title, Component } = found;

  return (
    <div className="relative border w-full rounded-[5px] flex flex-col gap-2 overflow-hidden">
      <div className="w-full bg-gray-300 px-2">
        <h3 className="p-2">{title || "Title"}</h3>
      </div>
      <Suspense fallback={<FetchLoader />}>{<Component />}</Suspense>
    </div>
  );
};

export default TabContent;
