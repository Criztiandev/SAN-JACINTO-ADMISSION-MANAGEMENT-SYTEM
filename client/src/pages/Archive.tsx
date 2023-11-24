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
import DeleteIcon from "../assets/icons/Delete.svg";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import CreateApplicant from "../containers/Applicants/CreateApplicant";
// Assets
import useCustomMutation from "../hooks/useCustomMutation";
import IconButton from "../components/IconButton";
import MessageIcon from "../assets/icons/Message_Dark.svg";
import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";
import Message from "../containers/Annoucement/Message";
import useURL from "../hooks/useURL";
import { toast } from "react-toastify";
import DeleteNotice from "../containers/Drawers/DeleteNotice";

const Archive = () => {
  const { updateURL } = useURL();
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant/archive",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  const archieveMutation = useCustomMutation({
    route: "/applicant/status",
    overrideFn: () => {
      refetch();
      toast.success("Converted Applicant Successfully");
    },
    type: "put",
  });

  const handleArchive = (id: string, status: string) => {
    archieveMutation.mutate({ _id: id, status });
  };

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
        const UID = row.original._id;
        const role = row?.original?.role;

        const prefRole = role === "transferee" ? "accepted" : "ending";

        return (
          <div className="flex gap-4">
            <IconButton
              icon={ApplicantIcon}
              as="outlined"
              onClick={() => handleArchive(UID, prefRole)}
            />
            <IconButton
              icon={MessageIcon}
              as="outlined"
              onClick={() => updateURL(`state=message&&APID=${UID}`)}
            />

            <IconButton
              icon={DeleteIcon}
              as="outlined"
              onClick={() => updateURL(`state=delete&&APID=${UID}`)}
            />
          </div>
        );
      },
    },
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout title="Archive">
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isPending}
          />
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </BaseLayout>

      <DrawerWrapper state="create" Component={CreateApplicant} />
      <DrawerWrapper state="message" Component={Message} />
      <DrawerWrapper state="view" Component={ViewApplicant} />
      <DrawerWrapper state="delete" Component={DeleteNotice} />
    </>
  );
};

export default Archive;
