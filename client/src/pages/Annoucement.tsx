/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";
import Applicants from "../assets/icons/Applicant_Dark.svg";
// Context and Helpers
import { useTableContext } from "../context/TableContext";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import ApplicantActionColumn from "../containers/Applicants/ApplicantActionColumn";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import EditApplicant from "../containers/Applicants/EditApplicant";
import CreateApplicant from "../containers/Applicants/CreateApplicant";
import ArchieveApplicant from "../containers/Applicants/ArchieveApplicant";
import MessageApplicant from "../containers/Applicants/MessageApplicant";
// Assets
import useCustomMutation from "../hooks/useCustomMutation";
import useURL from "../hooks/useURL";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const Applicant = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { updateURL, navigateTo } = useURL();

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant",
    overrideFn: handleMutateData,
    key: ["applicants23"],
  });

  // mutation
  const { mutateAsync } = useCustomMutation({
    route: `/examiniees/create`,
    overrideFn: () => refetch(),
  });

  const handleCreateApplicant = () => {
    updateURL("state=create");
  };

  const handleAction = async (id: string, currentStatus: string) => {
    void mutateAsync({ UID: id, status: currentStatus });
  };

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: "Name",
      accessorFn: ({ personalDetails }) =>
        `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName}`,
      cell: ({ row, getValue }) => {
        console.log(row);
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
        const { yearLevel } = studentDetails;
        return `${yearLevel.replace("Grade", "")}`;
      },
    },
    { header: "Gender", accessorKey: "personalDetails.gender" },
    { header: "BOD", accessorKey: "personalDetails.birthDate" },
    { header: "Age", accessorKey: "personalDetails.age" },
    {
      header: "Guardian",
      accessorKey: "studentDetails.legalGuardian",
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
        title="Applicants"
        actions={
          <div className="flex gap-4">
            <Dropdown
              as="outlined"
              icon={"dfdf"}
              option={[
                {
                  icon: Applicants,
                  title: "Examiniees",
                  onClick: () => navigateTo("/examiniees"),
                },
                {
                  icon: Applicants,
                  title: "Examiniees",
                  onClick: () => navigateTo("/batch"),
                },
                {
                  icon: Applicants,
                  title: "Examiniees",
                  onClick: () => navigateTo("/masterlist"),
                },
              ]}
              className="px-3 py-2 w-[150px]"
            />
            <Button
              as="contained"
              title="Create"
              onClick={handleCreateApplicant}
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
      <DrawerWrapper state="edit" Component={EditApplicant} />
      <DrawerWrapper state="archieve" Component={ArchieveApplicant} />
      <DrawerWrapper state="message" Component={MessageApplicant} />
      <DrawerWrapper state="view" Component={ViewApplicant} />
    </>
  );
};

export default Applicant;
