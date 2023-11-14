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
  isSuccess: boolean;
}

interface UseFormSubmitProps {
  route: string;
  redirect?: string;
  errRedirect?: string;
  overideFn?: () => void;
  type?: "post" | "put";
}

const useFormSubmit = ({
  route,
  redirect,
  errRedirect,
  overideFn,
  type = "post",
}: UseFormSubmitProps): FormSubmitResult => {
  const [currentPayload, setCurrentPayload] = useState<Array<object> | object>(
    {}
  );
  const navigate = useNavigate();

  const handleMutationError = (e: AxiosError) => {
    handleAxiosError(e);

    if (errRedirect) {
      navigate(errRedirect);
    }
  };

  const handleSuccessMutation = (payload: AxiosResponse) => {
    const { message } = payload.data;

    if (overideFn) {
      overideFn();
    }
    setCurrentPayload(payload.data);
    toast.success(message);
    if (redirect) {
      navigate(redirect);
    }
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

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (value) =>
      axios[`${type}`](`${import.meta.env.VITE_SERVER_URL}${route}`, value),
    onSuccess: handleSuccessMutation,
    onError: handleMutationError,
  });

  return { payload: currentPayload, handleSubmit, isPending, isSuccess };
};

export default useFormSubmit;
