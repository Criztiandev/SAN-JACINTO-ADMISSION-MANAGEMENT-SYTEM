/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import {
  Badge,
  Button,
  Dropdown,
  Table,
  IconButton,
  Drawer,
} from "../components";
import BaseLayout from "../layouts/BaseLayout";

import ApplicantIcon from "../assets/icons/Applicants.svg";
import SelectAllIcon from "../assets/icons/Select_All.svg";
import ImportIcon from "../assets/icons/Import_light.svg";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import MessageIcon from "../assets/icons/Message_light.svg";

import { annoucementData } from "../data/annoucementData";

interface FilterConfigItem {
  title: string;
  icon: string;
}

const FilterConfig: FilterConfigItem[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Published", icon: ApplicantIcon },
  { title: "Pending", icon: ApplicantIcon },
  { title: "Draft", icon: ApplicantIcon },
];

const Annoucement = () => {
  const [viewAnnoucement, setViewAnnoucement] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [createAnnoucement, setCreateAnnoucement] = useState(false);
  const [selection, setSelection] = useState(false);

  const HeaderConfig = (selection: boolean): ColumnDef<any, any>[] => {
    return [
      {
        header: "Title",
        accessorKey: "title",
        cell: ({ row, getValue }: any) => (
          <FirstColumn
            isSelection={selection}
            row={row}
            value={() => getValue()}
            Open={() => setViewAnnoucement(prev => !prev)}
          />
        ),
      },
      { header: "Date", accessorKey: "date" },
      { header: "Platform", accessorKey: "platform" },
      {
        header: "Content",
        accessorKey: "content",
        cell: ({ getValue }) => {
          const original = getValue();
          return <span className="p-4">{original.substr(0, 50)}</span>;
        },
      },
      { header: "Author", accessorKey: "author" },
      { header: "Audience", accessorKey: "audience" },
      { header: "Creator", accessorKey: "createdBy" },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }: any) => (
          <Badge as="neutral" type={getValue()} title={getValue()} />
        ),
      },
      {
        header: "Action",
        cell: ({ row }: any) => <ActionColumn row={row} disabled={selection} />,
      },
    ];
  };

  return (
    <>
      <BaseLayout
        title="Annoucement"
        header={
          <>
            <IconButton
              type="ghost"
              icon={MessageIcon}
              onClick={() => setOpenMessage(prev => !prev)}
            />
            <Button
              dir="left"
              title="Create"
              icon={CreateApplicantIcon}
              onClick={() => setCreateAnnoucement(prev => !prev)}
            />
          </>
        }
        action>
        {/* Table Container */}
      </BaseLayout>

      {openMessage && (
        <Drawer
          active={openMessage}
          title="Message"
          subtitle="Where you can see all the message"
          anchor="right"
          handleToggle={() => setOpenMessage(prev => !prev)}></Drawer>
      )}

      {viewAnnoucement && (
        <Drawer
          active={viewAnnoucement}
          title={"Annoucement Details"}
          subtitle=""
          anchor="right"
          handleToggle={() => setViewAnnoucement(prev => !prev)}></Drawer>
      )}

      {createAnnoucement && (
        <Drawer
          active={createAnnoucement}
          title={"Create Annoucement"}
          subtitle=""
          anchor="right"
          handleToggle={() => setCreateAnnoucement(prev => !prev)}></Drawer>
      )}
    </>
  );
};

export default Annoucement;
