/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar, Loading } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import { useTableContext } from "../context/TableContext";
import { useEffect, MouseEvent } from "react";

import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  GradeFilterButton,
  StatusFilterButton,
  MoreOptionButton,
} from "../containers/Applicants";

import { DrawerLists, TableConfig } from "../helper/Applicant.Helper";
import useDrawer from "../hooks/useDrawer";
import { fetchApplicants, updateStatusApplicant } from "../api/Applicant.Api";

const Applicant = () => {
  // Drawers
  const viewToggle = useDrawer();
  const createToggle = useDrawer();
  const updateToggle = useDrawer();
  const deleteToggle = useDrawer();
  const messageToggle = useDrawer();

  const { isLoading, isError, error, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await fetchApplicants();
      handleMutateData(data.payload);
      return data;
    },
    queryKey: ["applicants"],
  });

  const acceptApplicant = useMutation({
    mutationFn: async ({ APID, value }: any) => {
      return updateStatusApplicant(APID, value);
    },
    onSuccess: () => {
      toast.success("Applicant is Accepted Successfully");
    },

    onError: () => {
      toast.error("Failed, Please Try Again");
    },
  });

  const {
    tableData,
    search,
    selected,
    handleSearch,
    handleSelected,
    handleColumnSearch,
    setTableConfig,
    handleMutateData,
  } = useTableContext();

  const toggleOptions = {
    viewToggle,
    createToggle,
    updateToggle,
    deleteToggle,
    messageToggle,
  };

  const handleToggle = (data: object | string, toggle = () => {}) => {
    handleSelected(data);
    toggle();
  };

  const handleAccept = async (id: string, status: string) => {
    await acceptApplicant.mutateAsync({ APID: id, value: status });
    refetch();
  };

  // Setting up the Table Config
  useEffect(() => {
    const config = TableConfig(toggleOptions, handleToggle, handleAccept);
    if (!config) throw new Error("No Config");
    setTableConfig(config);

    return () => {
      setTableConfig([]);
    };
  }, []);

  // Checking if there us an error
  if (isError) toast.error(error.message);
  if (isLoading) return <Loading />;

  return (
    <>
      <BaseLayout
        title="Applicants"
        header={
          <Button
            dir="left"
            title="Create"
            icon={CreateApplicantIcon}
            onClick={createToggle.toggleDrawer}
          />
        }
        action>
        {tableData.length > 0 ? (
          <div className="flex justify-between items-center">
            <SearchBar value={search} onChange={handleSearch} />

            <div className="flex gap-4">
              <GradeFilterButton
                title="Grade"
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleColumnSearch({
                    id: "studentDetails.yearLevel",
                    value: e.currentTarget.value,
                  })
                }
              />
              <StatusFilterButton
                title="Filter"
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleColumnSearch({
                    id: "status",
                    value: e.currentTarget.value,
                  })
                }
              />
              <MoreOptionButton />
            </div>
          </div>
        ) : (
          <span></span>
        )}
        <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px" />
      </BaseLayout>

      {DrawerLists(selected, toggleOptions).map(
        ({ id, Component, state, ...props }: DrawerListProps) =>
          state ? <Component key={id} state={state} {...props} /> : null
      )}
    </>
  );
};

export default Applicant;
