/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAxiosError } from "../utils/Api.utils";

interface FormSubmitResult {
  payload: Array<object> | object;
  handleSubmit: (value: any, action: FormikHelpers<any>) => Promise<any>;
  isPending: boolean;
}

interface UseFormSubmitProps {
  route: string;
  redirect?: string;
  type?: "post" | "put";
}

const useFormSubmit = ({
  route,
  redirect,
  type = "post",
}: UseFormSubmitProps): FormSubmitResult => {
  const [currentPayload, setCurrentPayload] = useState<Array<object> | object>(
    {}
  );
  const navigate = useNavigate();

  const handleMutationError = (e: AxiosError) => {
    handleAxiosError(e);
    if (redirect) {
      navigate(redirect);
    }
  };

  const handleSuccessMutation = (payload: AxiosResponse) => {
    const { message } = payload.data;
    setCurrentPayload(payload.data);
    toast.success(message);
  };

  // a breather to avoid spamming
  const handleSubmit = async (value: any, action: FormikHelpers<any>) => {
    try {
      await mutateAsync(value);
      action.resetForm();
    } catch (e: any) {
      return e;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (value) =>
      axios[`${type}`](`${import.meta.env.VITE_SERVER_URL}${route}`, value),
    onSuccess: handleSuccessMutation,
    onError: handleMutationError,
  });

  return { payload: currentPayload, handleSubmit, isPending };
};

export default useFormSubmit;
