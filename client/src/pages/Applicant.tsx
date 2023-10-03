/* eslint-disable @typescript-eslint/no-explicit-any */

import applicantData from "../data/applicantData.json";
import { ColumnDef } from "@tanstack/react-table";
import { useState, MouseEvent } from "react";
import FilterIcon from "../assets/icons/Filter.svg";

import {
  Badge,
  Button,
  Table,
  Drawer,
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

interface ListItemProps {
  title: string;
  icon: string;
  value?: string;
}

interface ColumnInterface {
  yearLevel: { id: string; value: string };
  status: { id: string; value: string };
}

const FilterItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon, value: "" },
  { title: "Grade 7", icon: ApplicantIcon, value: "7" },
  { title: "Grade 8", icon: ApplicantIcon, value: "8" },
  { title: "Grade 9", icon: ApplicantIcon, value: "9" },
  { title: "Grade 10", icon: ApplicantIcon, value: "10" },
  { title: "Grade 11", icon: ApplicantIcon, value: "11" },
  { title: "Grade 12", icon: ApplicantIcon, value: "12" },
];

const StatusItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon, value: "" },
  { title: "Pending", icon: ApplicantIcon, value: "Pending" },
  { title: "Accepted", icon: ApplicantIcon, value: "Accepted" },
  { title: "Hold", icon: ApplicantIcon, value: "Hold" },
];

const MoreItems: ListItemProps[] = [
  { title: "Print", icon: ApplicantIcon },
  { title: "Export", icon: ApplicantIcon },
];

const Applicant = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<any>({});
  const [search, setSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<ColumnInterface>({
    yearLevel: { id: "yearLevel", value: "" },
    status: { id: "status", value: "" },
  });

  const createApplicant = useDrawer();
  const viewApplicant = useDrawer();
  const editApplicant = useDrawer();

  const handleViewApplicant = (data: any) => {
    setSelectedApplicant(data);
    viewApplicant.toggleDrawer();
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

  console.log(columnSearch);

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
              editApplicant.toggleDrawer();
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
              onClick={createApplicant.toggleDrawer}
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
              <Dropdown
                className="border z-50"
                style={{ width: "150px" }}
                as="button"
                type="outlined"
                title={handleTitleUpdate(
                  "Grade",
                  `Grade ${columnSearch.yearLevel.value}`
                )}
                icon={FilterIcon}>
                {FilterItems.map(items => (
                  <Button
                    key={items.title}
                    type="ghost"
                    dir="left"
                    value={items.value}
                    {...items}
                    onClick={(e: MouseEvent<HTMLButtonElement>) =>
                      handleSelect("yearLevel", e.currentTarget.value)
                    }
                  />
                ))}
              </Dropdown>

              <Dropdown
                className="border z-50 w-[150px]"
                as="button"
                type="outlined"
                title={handleTitleUpdate("Status", columnSearch.status.value)}
                icon={FilterIcon}>
                {StatusItems.map(items => (
                  <Button
                    key={items.title}
                    type="ghost"
                    dir="left"
                    value={items.title}
                    {...items}
                    onClick={(e: MouseEvent<HTMLButtonElement>) =>
                      handleSelect("status", e.currentTarget.value)
                    }
                  />
                ))}
              </Dropdown>
              <Dropdown type="outlined">
                {MoreItems.map(items => (
                  <Button
                    key={items.title}
                    type="ghost"
                    dir="left"
                    {...items}
                  />
                ))}
              </Dropdown>
            </div>
          </div>
          <Table
            data={applicantData}
            config={HeaderConfig}
            search={search}
            columnSearch={columnSearch}
          />
        </>
      </BaseLayout>

      {/* <Drawer /> */}
      {createApplicant.active && (
        <Drawer
          title="Create Applicant"
          subtitle="This able you to create applicant"
          active={createApplicant.active}
          handleToggle={createApplicant.toggleDrawer}>
          <h1>HI</h1>
        </Drawer>
      )}

      {viewApplicant.active && (
        <Drawer
          title={`${selectedApplicant?.last_name}, ${selectedApplicant?.first_name} ${selectedApplicant?.middle_name}`}
          subtitle="This able you to create applicant"
          active={createApplicant.active}
          handleToggle={viewApplicant.toggleDrawer}>
          <h1>HI</h1>
        </Drawer>
      )}

      {editApplicant.active && (
        <Drawer
          title={`${selectedApplicant?.last_name}, ${selectedApplicant?.first_name} ${selectedApplicant?.middle_name}`}
          subtitle="This able you to create applicant"
          active={createApplicant.active}
          handleToggle={editApplicant.toggleDrawer}>
          <h1>HI</h1>
        </Drawer>
      )}
    </>
  );
};

export default Applicant;
