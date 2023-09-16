/* eslint-disable @typescript-eslint/no-explicit-any */

import { applicantData } from "../data/applicantData";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import FirstColumn from "../containers/Table/FirstColumn";
import Badge from "../components/Badge";
import Button from "../components/Button";
import MonthPicker from "../containers/MonthPicker";
import ActionColumn from "../containers/Table/ActionColumn";
import BaseLayout from "../layouts/BaseLayout";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

import ApplicantIcon from "../assets/icons/Applicants.svg";
import SelectAllIcon from "../assets/icons/Select_All.svg";
import ImportIcon from "../assets/icons/Import_light.svg";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import IconButton from "../components/IconButton";
import ArchievedIcon from "../assets/icons/Arhive_light.svg";

interface FilterConfigItem {
  title: string;
  icon: string;
}

const FilterConfig: FilterConfigItem[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Grade 7", icon: ApplicantIcon },
  { title: "Grade 8", icon: ApplicantIcon },
  { title: "Grade 9", icon: ApplicantIcon },
  { title: "Grade 10", icon: ApplicantIcon },
  { title: "Grade 11", icon: ApplicantIcon },
  { title: "Grade 12", icon: ApplicantIcon },
];

const HeaderConfig = (selection: boolean): ColumnDef<any, any>[] => {
  return [
    {
      header: "Name",
      accessorFn: ({ last_name, first_name, middle_name }: any) =>
        `${last_name}, ${first_name} ${middle_name}`,
      cell: ({ row, getValue }: any) => (
        <FirstColumn
          isSelection={selection}
          row={row}
          value={() => getValue()}
        />
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
        <Badge type={getValue()} title={getValue()} />
      ),
    },
    {
      header: "Action",
      cell: ({ row }: any) => <ActionColumn row={row} disabled={selection} />,
    },
  ];
};

const Applicant = () => {
  const [selection, setSelection] = useState(false);

  return (
    <BaseLayout
      title="Applicants"
      header={
        <>
          <IconButton type="ghost" icon={ArchievedIcon} />
          <Button dir="left" title="Create" icon={CreateApplicantIcon} />
        </>
      }
      action>
      {/* Table Container */}
      <Table
        className="max-w-[1129px] overflow-hidden flex flex-col gap-4"
        data={applicantData}
        config={HeaderConfig(selection)}
        layout={
          "270px 150px 150px 100px 100px 100px 200px 150px 100px 100px 200px"
        }>
        <Table.Container.Header className="flex justify-between items-center">
          <Table.Tools.SearchBar />

          <Table.Separator className="flex gap-4">
            {selection ? (
              <Table.Tools.Action close={() => setSelection(false)} />
            ) : (
              <>
                <MonthPicker />
                <Table.Tools.Filter lists={FilterConfig} />

                <Dropdown as="icon" type="outlined">
                  <Button
                    dir="left"
                    icon={SelectAllIcon}
                    title="Selection"
                    type="ghost"
                    onClick={() => setSelection(prev => !prev)}
                  />

                  <Button
                    dir="left"
                    icon={ImportIcon}
                    title="Import"
                    type="ghost"
                  />

                  <Button title="Import" type="ghost" />
                </Dropdown>
              </>
            )}
          </Table.Separator>
        </Table.Container.Header>

        <Table.Container.Content>
          <Table.Head />
          <Table.Body />
        </Table.Container.Content>

        <Table.Container.Footer>
          <Table.Tools.Pagination />
        </Table.Container.Footer>
      </Table>
    </BaseLayout>
  );
};

export default Applicant;
