/* eslint-disable @typescript-eslint/no-explicit-any */
// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";
// Context and Helpers
import { useTableContext } from "../context/TableContext";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import MessageIcon from "../assets/icons/Message_Dark.svg";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import CreateApplicant from "../containers/Applicants/CreateApplicant";
import ArchieveApplicant from "../containers/Applicants/ArchieveApplicant";
// Assets
import useURL from "../hooks/useURL";
import Button from "../components/Button";
import CreateApplicantIcon from "../assets/icons/Create_Applicant_white.svg";
import IconButton from "../components/IconButton";
import Message from "../containers/Annoucement/Message";
import ArchiveIcon from "../assets/icons/Arhive_light.svg";
import { useEffect } from "react";

const Applicant = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { navigateTo, updateURL, queryParams } = useURL();

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant?role=transferee&status=accepted&extend=scheduled",
    overrideFn: handleMutateData,
    key: ["transferees"],
  });
  const isRefetch = queryParams.get("refetch");

  const handleArchive = (id: string) => {
    updateURL(`APID=${id}&state=archive`);
  };

  useEffect(() => {
    if (isRefetch) {
      refetch();
      updateURL("/");
    }
  }, [isRefetch]);

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      header: "Name",
      accessorFn: ({ personalDetails }) =>
        `${personalDetails?.lastName}, ${personalDetails?.firstName} ${personalDetails?.middleName}`,
      cell: ({ row, getValue }) => {
        const { original } = row;
        return (
          <FirstColumn
            UID={original?._id}
            gender={original?.gender}
            value={getValue()}
          />
        );
      },
    },

    { header: "LRN", accessorKey: "studentDetails.LRN" },
    {
      id: "yearLevel",
      header: "Grade Level",
      accessorFn: ({ studentDetails }) => {
        return `${studentDetails?.yearLevel?.replace("Grade", "")}`;
      },
    },
    { header: "Gender", accessorKey: "personalDetails.gender" },
    { header: "BOD", accessorKey: "personalDetails.birthDate" },
    { header: "Age", accessorKey: "personalDetails.age" },
    {
      header: "Guardian",
      accessorKey: "studentDetails.legalGuardian",
      accessorFn: ({ guardianDetails }) => {
        return `${guardianDetails?.legalGuardian?.lastName}, ${guardianDetails?.legalGuardian?.firstName} ${guardianDetails?.legalGuardian?.middleName[0]}.`;
      },
    },

    { header: "Contact", accessorKey: "personalDetails.contact" },
    { header: "Average", accessorKey: "gradeDetails.generalAve" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <Badge as="neutral" type={getValue()} title={getValue()} />
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const UID = row?.original?._id;
        return (
          <div className="flex gap-4">
            <IconButton
              icon={MessageIcon}
              as="outlined"
              onClick={() => updateURL(`state=message&&APID=${UID}`)}
            />

            <IconButton
              icon={ArchiveIcon}
              as="outlined"
              onClick={() => handleArchive(UID)}
            />
          </div>
        );
      },
    },
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout
        title="Regular"
        actions={
          <div className="flex gap-4">
            <Button
              as="contained"
              title="Batch"
              icon={CreateApplicantIcon}
              onClick={() => navigateTo("/batch?state=create")}
            />
          </div>
        }>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isPending}
          />

          <div className="flex justify-between gap-4"></div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </BaseLayout>

      <DrawerWrapper state="create" Component={CreateApplicant} />
      <DrawerWrapper state="archive" Component={ArchieveApplicant} />
      <DrawerWrapper state="message" Component={Message} />
      <DrawerWrapper state="view" Component={ViewApplicant} />
    </>
  );
};

export default Applicant;
