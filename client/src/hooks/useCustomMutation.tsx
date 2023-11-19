/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
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
  const { mutateAsync, mutate } = useMutation({
    mutationFn: (payload: any) => {
      return type === "delete"
        ? axios.delete(`${import.meta.env.VITE_SERVER_URL}${route}`)
        : axios[type](`${import.meta.env.VITE_SERVER_URL}${route}`, payload);
    },

    onSuccess: () => {
      toast.success("Applicant Accepted Successfully");
      if (overrideFn) {
        overrideFn();
      }
    },

    onError: (e: AxiosError) => {
      handleAxiosError(e);
    },
  });

  return {
    mutateAsync,
    mutate,
  };
};

export default useCustomMutation;
