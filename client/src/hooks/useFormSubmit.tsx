/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAxiosError } from "../utils/Api.utils";
import { useEffect } from "react";
interface FormSubmitResult {
  payload: Array<object> | object;
  handleSubmit: (value: any, action: FormikHelpers<any>) => Promise<any>;
  isPending: boolean;
  isSuccess: boolean;
  isThrottled?: boolean;
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
  const [isThrottled, setIsThrottled] = useState(false);
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

  const handleSuccessMutation = async (payload: AxiosResponse) => {
    const { message } = payload.data;

    if (overideFn) {
      overideFn();
    }
    setCurrentPayload(payload.data);
    toast.success(message);

    if (redirect) {
      // Wait for seconds (adjust timeout duration if needed)
      const timeoutDuration = 1000;
      await new Promise((resolve) => setTimeout(resolve, timeoutDuration));

      navigate(redirect);
    }
  };

  // a breather to avoid spamming
  const handleSubmit = async (value: any, action: FormikHelpers<any>) => {
    try {
      if (!isThrottled) {
        await mutateAsync(value);
        action.resetForm();
        setIsThrottled(true);
      }
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

  useEffect(() => {
    if (isThrottled) {
      const timeoutId = setTimeout(() => {
        setIsThrottled(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isThrottled]);

  return {
    payload: currentPayload,
    handleSubmit,
    isPending,
    isSuccess,
    isThrottled,
  };
};

export default useFormSubmit;
