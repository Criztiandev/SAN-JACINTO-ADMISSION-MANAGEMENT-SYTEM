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
}

interface UseFormSubmitProps {
  route: string;
  redirect?: string;
  type: "post" | "put";
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

  const handleSubmit = async (value: any, action: FormikHelpers<any>) => {
    await mutateAsync(value);
    action.resetForm();
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (value) =>
      axios[`${type}`](`${import.meta.env.VITE_SERVER_URL}${route}`, value),
    onError: handleMutationError,
    onSuccess: handleSuccessMutation,
  });

  return { payload: currentPayload, handleSubmit };
};

export default useFormSubmit;
