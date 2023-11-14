/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleAxiosError } from "../utils/Api.utils";

interface useFetchProps {
  route: string;
  key: Array<string>;
  overrideFn?: (data: any) => void;
}

const useFetch = ({ route, key, overrideFn }: useFetchProps) => {
  const query = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}${route}`
        );

        const { payload } = res.data;

        if (overrideFn) {
          overrideFn(payload);
        }
        return payload;
      } catch (e: any) {
        handleAxiosError(e);
        throw e;
      }
    },
    queryKey: key,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return query;
};

export default useFetch;
