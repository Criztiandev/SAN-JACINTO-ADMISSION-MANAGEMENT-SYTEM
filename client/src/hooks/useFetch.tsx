/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "../utils/Api.utils";

interface useFetchProps {
  route: string;
  key: Array<string>;
}

const useFetch = ({ route, key }: useFetchProps) => {
  const query = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/${route}`
        );
        const { payload, message } = res.data;
        toast.success(message || "Fetch Successfully");
        return payload;
      } catch (e: any) {
        handleAxiosError(e);
        throw e;
      }
    },
    queryKey: key,
  });

  return query;
};

export default useFetch;
