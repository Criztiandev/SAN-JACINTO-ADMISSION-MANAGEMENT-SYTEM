import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: AxiosError) => {
  if (!error.response) {
    toast.error("Error: Something went wrong");
    return;
  }

  const { data, status } = error.response;

  if (status === 400) {
    toast.error("Resource Not Found");
    return;
  }

  const { error: responseError } = data as { error: string };

  if (data && responseError) {
    toast.error(responseError);
  } else {
    toast.error(`HTTP error ${status}`);
  }
  return;
};
