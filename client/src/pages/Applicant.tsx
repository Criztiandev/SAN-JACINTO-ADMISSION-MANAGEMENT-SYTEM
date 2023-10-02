/* eslint-disable @typescript-eslint/no-explicit-any */

import { applicantData } from "../data/applicantData";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect, MouseEvent } from "react";
import FilterIcon from "../assets/icons/Filter.svg";

import {
  Badge,
  Button,
  Table,
  Drawer,
  IconButton,
  Avatar,
  SearchBar,
  Dropdown,
} from "../components";
import BaseLayout from "../layouts/BaseLayout";

import ApplicantIcon from "../assets/icons/Applicants.svg";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import useDrawer from "../hooks/useDrawer";
import Checkbox from "../components/Checkbox";

interface ListItemProps {
  title: string;
  icon: string;
}

interface FormProps {
  search: string;
  yearLevel: string;
  status: string;
}

const FilterItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Grade 7", icon: ApplicantIcon },
  { title: "Grade 8", icon: ApplicantIcon },
  { title: "Grade 9", icon: ApplicantIcon },
  { title: "Grade 10", icon: ApplicantIcon },
  { title: "Grade 11", icon: ApplicantIcon },
  { title: "Grade 12", icon: ApplicantIcon },
];

const StatusItems: ListItemProps[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Pending", icon: ApplicantIcon },
  { title: "Examinee", icon: ApplicantIcon },
  { title: "Hold", icon: ApplicantIcon },
];

const HeaderConfig: ColumnDef<any, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex gap-4">
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
        <span className="w-full">Name</span>
      </div>
    ),
    accessorFn: row => `${row.last_name}, ${row.first_name} ${row.middle_name}`,

    cell: ({ row, getValue }) => (
      <div className="flex gap-4 items-center ">
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />

        <Avatar />

        <span>{getValue()}</span>
      </div>
    ),
  },
  { header: "LRN", accessorKey: "LRN" },
  {
    header: "Grade Level",
    accessorKey: "yearLevel",
    cell: (row: any) => row.getValue()?.split(" ")[1],
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
    cell: () => (
      <span className="flex gap-4">
        <IconButton type="outlined" />
        <IconButton type="outlined" />
        <IconButton type="outlined" />
      </span>
    ),
  },
];

const Applicant = () => {
  const [activeField, setActiveField] = useState<string>("");
  const [formState, setFormState] = useState<FormProps | any>({
    search: "",
    yearLevel: "",
    status: "",
  });

  const filter = formState.search || formState.yearLevel || formState.status;

  const createApplicant = useDrawer();
  const viewApplicant = useDrawer();

  const handleInputUpdate = (name: string, value: string) =>
    setFormState({ ...formState, [name]: value });

  const handleActiveField = (name: string) => setActiveField(name);

  const handleSelect =
    (field: string) => (event: MouseEvent<HTMLButtonElement>) => {
      const name = event.currentTarget.name;
      const value = name === "Default" ? "" : name;
      handleInputUpdate(field, value);
      handleActiveField(field);
    };

  useEffect(() => {
    const states: any = {};

    // Reset all the States
    for (const field in formState) {
      states[field] = field === activeField ? formState[activeField] : "";
    }

    setFormState(states);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeField]);

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
              value={formState.search}
              onChange={e => handleInputUpdate("search", e.target.value)}
              onClick={() => handleActiveField("search")}
            />

            <div className="flex gap-4">
              <Dropdown
                className="border z-50"
                style={{ width: "150px" }}
                as="button"
                type="outlined"
                title={formState.yearLevel || "Grade Level"}
                icon={FilterIcon}>
                {FilterItems.map(items => (
                  <Button
                    key={items.title}
                    type="ghost"
                    dir="left"
                    name={items.title}
                    {...items}
                    onClick={handleSelect("yearLevel")}
                  />
                ))}
              </Dropdown>

              <Dropdown
                className="border z-50 w-[150px]"
                as="button"
                type="outlined"
                title={formState.status || "Status"}
                icon={FilterIcon}>
                {StatusItems.map(items => (
                  <Button
                    key={items.title}
                    type="ghost"
                    dir="left"
                    name={items.title}
                    {...items}
                    onClick={handleSelect("status")}
                  />
                ))}
              </Dropdown>
              <IconButton type="outlined" />
            </div>
          </div>
          <Table data={applicantData} config={HeaderConfig} filter={filter} />
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
          title="Create Applicant"
          subtitle="This able you to create applicant"
          active={createApplicant.active}
          handleToggle={viewApplicant.toggleDrawer}>
          <h1>HI</h1>
        </Drawer>
      )}
    </>
  );
};

export default Applicant;
