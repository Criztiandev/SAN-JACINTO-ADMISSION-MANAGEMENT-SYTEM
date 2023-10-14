/* eslint-disable @typescript-eslint/no-explicit-any */

import applicantData from "../data/applicantData.json";
import { ColumnDef } from "@tanstack/react-table";
import { useState, MouseEvent } from "react";
import FilterIcon from "../assets/icons/Filter.svg";

import {
  Badge,
  Button,
  Table,
  IconButton,
  SearchBar,
  Dropdown,
} from "../components";
import BaseLayout from "../layouts/BaseLayout";

import ApplicantIcon from "../assets/icons/Applicants.svg";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import AcceptIcon from "../assets/icons/Done_light.svg";
import EditIcon from "../assets/icons/Edit_light.svg";
import MessageIcon from "../assets/icons/Message_light.svg";
import useDrawer from "../hooks/useDrawer";
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import CreateDrawer from "../containers/Applicants/CreateDrawer";
import ViewDrawer from "../containers/Applicants/ViewDrawer";
import GradeFilter from "../containers/Applicants/GradeFilter";
import StatusFilter from "../containers/Applicants/StatusFilter";
import MoreOption from "../containers/Applicants/MoreOption";

interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

interface ColumnInterface {
  yearLevel: { id: string; value: string };
  status: { id: string; value: string };
}

const Applicant = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<any>({});
  const [search, setSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<ColumnInterface>({
    yearLevel: { id: "yearLevel", value: "" },
    status: { id: "status", value: "" },
  });

  const createToggel = useDrawer();
  const viewToggle = useDrawer();

  const handleViewApplicant = (data: any) => {
    setSelectedApplicant(data);
    viewToggle.toggleDrawer();
  };

  const handleSelect = (name: keyof ColumnInterface, value: string) => {
    setColumnSearch(prev => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));
  };

  const handleTitleUpdate = (_default: string, value: string) => {
    if (value === "Default" || value === "") return _default;
    return value;
  };

  const HeaderConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: ({ table }) => <TitleHeader data={table} />,
      accessorFn: row =>
        `${row.last_name}, ${row.first_name} ${row.middle_name}`,

      cell: ({ row, getValue }) => (
        <FirstColumn
          data={row}
          value={getValue()}
          viewApplicant={() => handleViewApplicant(row.original)}
        />
      ),
    },
    { header: "LRN", accessorKey: "LRN" },
    {
      header: "Grade Level",
      accessorKey: "yearLevel",
      accessorFn: row => `${row.yearLevel.split(" ")[1]}`,
    },
    { header: "Gender", accessorKey: "gender" },
    { header: "BOD", accessorKey: "BOD" },
    { header: "Age", accessorKey: "age" },
    { header: "Guardian", accessorKey: "guardian.legal" },
    { header: "Contact", accessorKey: "contact" },
    { header: "Ave", accessorKey: "remarks" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <Badge as="neutral" type={getValue()} title={getValue()} />
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <span className="flex gap-4">
          <IconButton type="outlined" icon={AcceptIcon} />
          <IconButton
            type="outlined"
            icon={EditIcon}
            onClick={() => {
              setSelectedApplicant(row.original);
            }}
          />
          <Dropdown>
            <Button
              title="Message"
              type="ghost"
              icon={MessageIcon}
              dir="left"
            />

            <Button
              title="Message"
              type="ghost"
              icon={MessageIcon}
              dir="left"
            />

            <Button
              title="Message"
              type="ghost"
              icon={MessageIcon}
              dir="left"
            />
          </Dropdown>
        </span>
      ),
    },
  ];

  return (
    <>
      <BaseLayout
        title="Applicants"
        header={
          <>
            <Button
              dir="left"
              title="Create"
              icon={CreateApplicantIcon}
              onClick={createToggel.toggleDrawer}
            />
          </>
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
                onSelect={e => handleSelect("yearLevel", e.currentTarget.value)}
              />

              {/* // Status Filter */}
              <StatusFilter
                onTitleUpdate={() =>
                  handleTitleUpdate("Status", columnSearch.status.value)
                }
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleSelect("status", e.currentTarget.value)
                }
              />

              <MoreOption />
            </div>
          </div>
          <Table
            data={applicantData}
            config={HeaderConfig}
            search={search}
            columnSearch={[
              { ...columnSearch.yearLevel },
              { ...columnSearch.status },
            ]}
            layout="300px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px"
          />
        </>
      </BaseLayout>

      {/* <Drawer /> */}
      <CreateDrawer
        state={createToggel.active}
        onClick={createToggel.toggleDrawer}
      />

      <ViewDrawer state={viewToggle.active} onClick={viewToggle.toggleDrawer} />
    </>
  );
};

export default Applicant;
