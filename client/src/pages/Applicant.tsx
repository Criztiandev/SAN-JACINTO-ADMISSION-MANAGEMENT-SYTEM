/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar, Loading } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import { useTableContext } from "../context/TableContext";
import { useEffect } from "react";

import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

import {
  GradeFilterButton,
  StatusFilterButton,
  MoreOptionButton,
} from "../containers/Applicants";

import { DrawerLists, TableConfig } from "../helper/Applicant.Helper";
import useDrawer from "../hooks/useDrawer";

const Applicant = () => {
  const { isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/api/applicant");
      handleMutateData(data.payload);
      return data;
    },
    queryKey: ["applicants"],
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

  // Drawers
  const viewToggle = useDrawer();
  const createToggle = useDrawer();
  const updateToggle = useDrawer();
  const deleteToggle = useDrawer();
  const messageToggle = useDrawer();

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

  const handleAccept = (id: string, status: string) => {
    toast.success(`Applicant: ${id} is Updated to ${status} Successfully`);
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
                onSelect={e =>
                  handleColumnSearch({
                    id: "studentDetails.yearLevel",
                    value: e.currentTarget.value,
                  })
                }
              />
              <StatusFilterButton
                title="Filter"
                onSelect={e =>
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
        ({ id, Component, state, ...props }: DrawerListProps) => (
          <Component key={id} state={state} {...props} />
        )
      )}
    </>
  );
};

export default Applicant;
