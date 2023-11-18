/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

// Context and Helpers
import { useTableContext } from "../context/TableContext";
import { RenderFilterButton } from "../helper/Applicant.Helper";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import TitleHeader from "../containers/Table/TitleHeader";
import ApplicantActionColumn from "../containers/Applicants/ApplicantActionColumn";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import EditApplicant from "../containers/Applicants/EditApplicant";
import ArchieveApplicant from "../containers/Applicants/ArchieveApplicant";
import MessageApplicant from "../containers/Applicants/MessageApplicant";

// Assets
import ExportIcon from "../assets/icons/Print_light.svg";

import useCustomMutation from "../hooks/useCustomMutation";
import useURL from "../hooks/useURL";
import ExportApplicant from "../containers/Masterlist/ExportApplicant";
import Button from "../components/Button";

const Applicant = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { updateURL } = useURL();

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant/regular",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  // mutation
  const { mutateAsync } = useCustomMutation({
    route: `/applicant/accept/`,
    overrideFn: () => refetch(),
  });

  const toggleExportDrawer = () => {
    updateURL("state=export");
  };

  const handleAction = async (id: string, currentStatus: string) => {
    void mutateAsync({ UID: id, status: currentStatus });
  };

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
        return (
          <ApplicantActionColumn data={row.original} onAction={handleAction} />
        );
      },
    },
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout
        title="Master List"
        actions={
          <div className="flex gap-4">
            <Button
              icon={ExportIcon}
              title="Export"
              onClick={toggleExportDrawer}
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

          <div className="flex justify-between gap-4">
            <RenderFilterButton loading={isPending} />
          </div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </BaseLayout>

      <DrawerWrapper state="edit" Component={EditApplicant} />
      <DrawerWrapper state="archieve" Component={ArchieveApplicant} />
      <DrawerWrapper state="message" Component={MessageApplicant} />
      <DrawerWrapper state="view" Component={ViewApplicant} />
      <DrawerWrapper state="export" Component={ExportApplicant} />
    </>
  );
};

export default Applicant;
