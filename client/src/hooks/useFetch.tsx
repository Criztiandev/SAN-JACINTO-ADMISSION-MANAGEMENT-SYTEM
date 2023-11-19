/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleAxiosError } from "../utils/Api.utils";
import { UseQueryOptions, QueryKey } from "@tanstack/react-query";

type NullableQueryKey = QueryKey | undefined;

interface UseFetchProps {
  route: string;
  key?: NullableQueryKey;
  overrideFn?: (data: any) => void;
  option?: Partial<UseQueryOptions<any, unknown>>;
}

const useFetch = ({ route, key, overrideFn, option }: UseFetchProps) => {
  const query = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}${route}`
        );

        if (overrideFn) {
          overrideFn(res.data.payload);
        }
        return res.data.payload;
      } catch (e: any) {
        handleAxiosError(e);
        throw e;
      }
    },
    ...option,
    refetchOnMount: true,
    queryKey: key ?? [],
  });

  return query;
};

export default useFetch;
