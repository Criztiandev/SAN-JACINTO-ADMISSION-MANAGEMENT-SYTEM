/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormSubmitResult {
  payload: Array<object> | object;
  handleSubmit: (value: any, action: FormikHelpers<any>) => Promise<any>;
}

const useFormSubmit = (path: string): FormSubmitResult => {
  const [currentPayload, setCurrentPayload] = useState<Array<object> | object>(
    {}
  );

  const handleMutationError = (error: AxiosError) => {
    if (!error.response) {
      toast.error("Error: Something went wrong");
      return;
    }

    const { message } = error.response.data as { message: string };
    toast.error(message);
  };

  const handleSuccessMutation = (payload: AxiosResponse) => {
    const { message } = payload.data;
    setCurrentPayload(payload.data);
    toast.success(message);
  };

  const handleSubmit = async (value: any, action: FormikHelpers<any>) => {
    try {
      await mutateAsync(value);
      action.resetForm();
    } catch (e) {
      return e;
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (value) =>
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/${path}`, value),
    onError: handleMutationError,
    onSuccess: handleSuccessMutation,
  });

  return { payload: currentPayload, handleSubmit };
};

export default useFormSubmit;
