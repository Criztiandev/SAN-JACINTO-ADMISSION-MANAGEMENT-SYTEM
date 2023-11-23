/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../utils/Api.utils";

interface useCustomMutationProps {
  route: string;
  overrideFn?: () => void;
  type?: "post" | "put" | "delete";
}

const useCustomMutation = ({
  route,
  overrideFn,
  type = "post",
}: useCustomMutationProps) => {
  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return type === "delete"
        ? axios.delete(`${import.meta.env.VITE_SERVER_URL}${route}`)
        : axios[type](`${import.meta.env.VITE_SERVER_URL}${route}`, payload);
    },

    onSuccess: () => {
      if (overrideFn) {
        overrideFn();
      }
    },

    onError: (e: AxiosError) => {
      handleAxiosError(e);
    },
  });

  return {
    ...mutation,
  };
};

export default useCustomMutation;
