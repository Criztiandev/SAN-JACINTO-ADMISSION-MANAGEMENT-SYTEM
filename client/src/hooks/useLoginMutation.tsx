/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../api/Auth.Api";
import { loginCredentialsParams } from "../interface/Auth.Types";
import { FormikHelpers } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const handleMutationError = (error: AxiosError) => {
  if (!error.response) {
    toast.error("Something went wrong, please Try again");
    return;
  }
  const { message } = error.response.data as { message: string };
  toast.error(message);
  return;
};
const handleSuccessMutation = (payload: AxiosResponse) => {
  const { _id, message } = payload.data;
  toast.success(message);
};

const useLoginMutation = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: loginCredentialsParams) => loginAdmin(data),
    onError: handleMutationError,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (
    value: loginCredentialsParams,
    action: FormikHelpers<loginCredentialsParams>
  ) => {
    try {
      await mutateAsync(value);
      action.resetForm();
    } catch (e: AxiosError | any) {
      return e;
    }
  };

  return { handleSubmit };
};

export default useLoginMutation;
