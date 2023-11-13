/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";
import IconButton from "../components/IconButton";

// Context and Helpers
import { useTableContext } from "../context/TableContext";
import {
  RenderCreateButton,
  RenderFilterButton,
} from "../helper/Applicant.Helper";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

// Containers
import TitleHeader from "../containers/Table/TitleHeader";
import ApplicantActionColumn from "../containers/Applicants/ApplicantActionColumn";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Axios and API Utils
import axios from "axios";
import { handleAxiosError } from "../utils/Api.utils";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";

const ViewApplicant = lazy(
  () => import("../containers/Applicants/ViewApplicant")
);
const EditApplicant = lazy(
  () => import("../containers/Applicants/EditApplicant")
);
const MessageApplicant = lazy(
  () => import("../containers/Applicants/MessageApplicant")
);
const ArchieveApplicant = lazy(
  () => import("../containers/Applicants/ArchieveApplicant")
);
const CreateApplicant = lazy(
  () => import("../containers/Applicants/CreateApplicant")
);

// Assets
import ArchieveIcon from "../assets/icons/Arhive_light.svg";
import DrawerLoader from "../containers/Loaders/DrawerLoader";

const Applicant = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const navigate = useNavigate();

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  // mutation
  const { mutateAsync } = useMutation({
    mutationFn: ({ UID, status }: { UID: string; status: string }) => {
      return axios.put(`${import.meta.env.VITE_SERVER_URL}/applicant/${UID}`, {
        status,
      });
    },

    onSuccess: () => {
      toast.success("Applicant Accepted Successfully");
      refetch();
    },

    onError: (e: AxiosError) => {
      handleAxiosError(e);
    },
  });

  const handleCreateApplicant = () => {
    navigate("/applicants?state=create");
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
        title="Applicants"
        actions={
          <div className="flex gap-4">
            <IconButton
              as="outlined"
              icon={ArchieveIcon}
              onClick={() => navigate("/applicant/archieve")}
            />
            <RenderCreateButton
              toggle={handleCreateApplicant}
              loading={isLoading || isPending}
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

      <Suspense fallback={<DrawerLoader />}>
        <DrawerWrapper state="create" Component={CreateApplicant} />
        <DrawerWrapper state="edit" Component={EditApplicant} />
        <DrawerWrapper state="archieve" Component={ArchieveApplicant} />
        <DrawerWrapper state="message" Component={MessageApplicant} />
        <DrawerWrapper state="view" Component={ViewApplicant} />
      </Suspense>
    </>
  );
};

export default Applicant;
