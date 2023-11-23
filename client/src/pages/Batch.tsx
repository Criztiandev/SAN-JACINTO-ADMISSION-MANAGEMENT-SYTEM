/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies
import { useEffect } from "react";

import BaseLayout from "../layouts/BaseLayout";

import { useTableContext } from "../context/TableContext";
import useFetch from "../hooks/useFetch";

import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import DrawerWrapper from "../containers/Drawers/DrawerWrapper";

// Assets
import useURL from "../hooks/useURL";
import ViewBatch from "../containers/Batch/ViewBatch";
import CreateBatch from "../containers/Batch/CreateBatch";
import BatchCard from "../containers/Batch/BatchCard";
import CreateBatchButton from "../containers/Batch/CreateBatchButton";
import DeleteNotice from "../containers/Drawers/DeleteNotice";
import Annoucement from "../containers/Annoucement/Annoucement";

const Batch = () => {
  const { handleMutateData } = useTableContext();
  const { updateURL, queryParams } = useURL();
  const isRefetch = queryParams.get("refetch");

  const { data, isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/batch",
    overrideFn: handleMutateData,
    key: ["batchess"],
  });

  const handleCreate = () => {
    updateURL("state=create");
  };

  useEffect(() => {
    if (isRefetch) {
      refetch();
      updateURL("/");
    }
  }, [isRefetch]);

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  return (
    <>
      <BaseLayout title="Batch">
        <div className="grid grid-cols-4 gap-8">
          {data?.map(({ selected, ...props }: any) => (
            <BatchCard key={props.title} length={selected?.length} {...props} />
          ))}
          <CreateBatchButton onClick={handleCreate} />
        </div>
      </BaseLayout>

      <DrawerWrapper state="create" Component={CreateBatch} />
      <DrawerWrapper state="delete" Component={DeleteNotice} />
      <DrawerWrapper state="view" Component={ViewBatch} />
      <DrawerWrapper state="annoucement" Component={Annoucement} />
    </>
  );
};

export default Batch;
