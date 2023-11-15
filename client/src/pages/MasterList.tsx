/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies
import { Suspense } from "react";

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";

// Context and Helpers
import { useTableContext } from "../context/TableContext";

import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewApplicant from "../containers/Applicants/ViewApplicant";

// Assets
import DrawerLoader from "../containers/Loaders/DrawerLoader";
import Button from "../components/Button";

const Applicant = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();

  const { isLoading, isPending, isFetched } = useFetch({
    route: "/applicant/regular",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: ({ table }) => <TitleHeader data={table} />,
      accessorFn: ({ personalDetails }) =>
        `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName}`,
      cell: ({ row, getValue }) => (
        <FirstColumn data={row} value={getValue()} />
      ),
    },

    { header: "LRN", accessorKey: "studentDetails.LRN" },
    {
      header: "Grade Level",
      accessorKey: "studentDetails.yearLevel",
      accessorFn: ({ studentDetails }) =>
        `${studentDetails.yearLevel.split(" ")[1]}`,
    },
    { header: "Gender", accessorKey: "personalDetails.gender" },
    { header: "BOD", accessorKey: "personalDetails.birthDate" },
    { header: "Age", accessorKey: "personalDetails.age" },
    {
      header: "Guardian",
      accessorKey: "guardianDetails.legalGuardian",
      accessorFn: ({ guardianDetails }) => {
        const { firstName, middleName, lastName } =
          guardianDetails.legalGuardian;

        return `${lastName}, ${firstName} ${middleName[0]}.`;
      },
    },

    { header: "Contact", accessorKey: "personalDetails.contact" },
    { header: "Average", accessorKey: "gradeDetails.generalAve" },
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout
        title="Master List"
        actions={
          <div className="flex gap-4">
            <Button as="contained" title="Export" />
          </div>
        }>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isPending}
          />

          <div className="flex justify-between gap-4">
            <Button as="outlined" title="Applicants" />
            <Button as="outlined" title="Regular" />
          </div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </BaseLayout>

      <Suspense fallback={<DrawerLoader />}>
        <DrawerWrapper state="view" Component={ViewApplicant} />
      </Suspense>
    </>
  );
};

export default Applicant;
