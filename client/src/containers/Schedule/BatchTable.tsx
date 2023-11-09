import { useQuery } from "@tanstack/react-query";
import { Table } from "../../components";
import { fetchAllData } from "../../utils/Api.utils";
import FetchLoader from "../General/FetchLoader";
import { useTableContext } from "../../context/TableContext";
import { useEffect } from "react";
import { TableConfig } from "../../helper/Applicant.Helper";
const BatchTable = () => {
  const { isLoading, isError } = useQuery({
    queryFn: async () => {
      const { payload } = await fetchAllData("applicant");
      handleMutateData(payload);
      return payload;
    },
    queryKey: ["applicants"],
  });

  const { handleMutateData, setTableConfig } = useTableContext();

  // Setting up the Table Config
  useEffect(() => {
    const config = TableConfig({
      toggles: {},
      onToggle: () => {},
      onAccept: () => {},
    });

    if (!config) throw new Error("No Config");
    setTableConfig(config);

    return () => {
      setTableConfig([]);
    };
  }, []);

  if (isLoading || isError) return <FetchLoader />;

  return (
    <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px" />
  );
};

export default BatchTable;
