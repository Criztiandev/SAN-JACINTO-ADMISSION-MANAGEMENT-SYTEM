/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// External Dependencies
import { Suspense } from "react";

import BaseLayout from "../layouts/BaseLayout";
import SearchBar from "../components/SearchBar";

import { useTableContext } from "../context/TableContext";
import useFetch from "../hooks/useFetch";

import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import DrawerWrapper from "../containers/Drawers/DrawerWrapper";

// Assets
import DrawerLoader from "../containers/Loaders/DrawerLoader";
import useURL from "../hooks/useURL";
import EditBatch from "../containers/Batch/EditBatch";
import DeleteBatch from "../containers/Batch/DeleteBatch";
import ViewBatch from "../containers/Batch/ViewBatch";
import CreateBatch from "../containers/Batch/CreateBatch";
import BatchCard from "../containers/Batch/BatchCard";
import CreateBatchButton from "../containers/Batch/CreateBatchButton";
import DeleteNotice from "../containers/Drawers/DeleteNotice";

const Batch = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { updateURL } = useURL();

  const { data, isLoading, isPending, isFetched } = useFetch({
    route: "/batch",
    overrideFn: handleMutateData,
    key: ["batchExaminiees"],
  });

  const handleCreate = () => {
    updateURL("state=create");
  };

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  console.log(data);

  return (
    <>
      <BaseLayout title="Batch">
        <div className="grid grid-cols-4 gap-8">
          {data?.map(({ examiniees, ...props }: any) => (
            <BatchCard length={examiniees?.length} {...props} />
          ))}
          <CreateBatchButton onClick={handleCreate} />
        </div>
      </BaseLayout>

      <Suspense fallback={<DrawerLoader />}>
        <DrawerWrapper state="create" Component={CreateBatch} />
        <DrawerWrapper state="edit" Component={EditBatch} />
        <DrawerWrapper state="delete" Component={DeleteNotice} />
        <DrawerWrapper state="view" Component={ViewBatch} />
      </Suspense>
    </>
  );
};

export default Batch;
