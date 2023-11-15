/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";

// Context and Helpers
import { useTableContext } from "../context/TableContext";
import { RenderFilterButton } from "../helper/Applicant.Helper";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";

// Assets

import ViewApplicant from "../containers/Applicants/ViewApplicant";
import Button from "../components/Button";

const Examiniees = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();

  const { isLoading, isPending, isFetched } = useFetch({
    route: "/applicant/examiniees",
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
    { header: "Average", accessorKey: "gradeDetails.generalAve" },
    { header: "Gender", accessorKey: "personalDetails.gender" },
    {
      header: "BOD",
      accessorKey: "personalDetails.birthDate",
    },
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
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout title="Examiniees" actions={<Button title="Export" />}>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isPending}
          />

          <div className="flex justify-between gap-4">
            <RenderFilterButton loading={isPending} />
          </div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px "
        />
      </BaseLayout>

      <DrawerWrapper state="view" Component={ViewApplicant} />
    </>
  );
};

export default Examiniees;
