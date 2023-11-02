import { useQuery } from "@tanstack/react-query";
import { Table } from "../../components";
import { fetchAllData } from "../../utils/Api.utils";
import FetchLoader from "../General/FetchLoader";
const BatchTable = () => {
  const { isLoading, isError } = useQuery({
    queryFn: async () => fetchAllData("applicant"),
    queryKey: ["batch"],
  });

  if (isLoading || isError) return <FetchLoader />;

  return (
    <div>
      <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px" />
    </div>
  );
};

export default BatchTable;
