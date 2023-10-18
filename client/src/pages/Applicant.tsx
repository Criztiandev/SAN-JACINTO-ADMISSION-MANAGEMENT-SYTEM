/* eslint-disable @typescript-eslint/no-explicit-any */

import applicantData from "../data/applicantData.json";
import { useState, MouseEvent } from "react";

import { Button, Table, SearchBar } from "../components";
import BaseLayout from "../layouts/BaseLayout";

import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";

import GradeFilter from "../containers/Applicants/GradeFilter";
import StatusFilter from "../containers/Applicants/StatusFilter";
import MoreOption from "../containers/Applicants/MoreOption";
import { handleTitleUpdate } from "../helper/applicantPanelHelper";
import { useApplicantPanelContext } from "../context/ApplicantPanelContext";

interface ColumnInterface {
  yearLevel: { id: string; value: string };
  status: { id: string; value: string };
}

interface DrawerListProps {
  id: string;
  Component: any;
  data?: Array<object> | string;
  state: boolean;
  onClose: () => void;
}

const Applicant = () => {
  const { TableConfig, DrawerLists, createToggle } = useApplicantPanelContext();

  const [search, setSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<ColumnInterface>({
    yearLevel: { id: "studentDetails.yearLevel", value: "" },
    status: { id: "status", value: "" },
  });

  const handleColumnSearch = (name: keyof ColumnInterface, value: string) => {
    setColumnSearch(prev => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));
  };

  return (
    <>
      <BaseLayout
        title="Applicants"
        header={
          <Button
            dir="left"
            title="Create"
            icon={CreateApplicantIcon}
            onClick={createToggle}
          />
        }
        action>
        <>
          <div className="flex justify-between items-center">
            <SearchBar
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="flex gap-4">
              {/* Grade Filter */}
              <GradeFilter
                onTitleUpdate={() =>
                  handleTitleUpdate(
                    "Grade",
                    `Grade ${columnSearch.yearLevel.value}`
                  )
                }
                onSelect={e =>
                  handleColumnSearch("yearLevel", e.currentTarget.value)
                }
              />

              {/* // Status Filter */}
              <StatusFilter
                onTitleUpdate={() =>
                  handleTitleUpdate("Status", columnSearch.status.value)
                }
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleColumnSearch("status", e.currentTarget.value)
                }
              />

              <MoreOption />
            </div>
          </div>
          <Table
            data={applicantData}
            config={TableConfig}
            search={search}
            columnSearch={[{ ...columnSearch.status }]}
            layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px"
          />
        </>
      </BaseLayout>

      {DrawerLists.map(({ id, Component, ...props }: DrawerListProps) => (
        <Component key={id} {...props} />
      ))}
    </>
  );
};

export default Applicant;
