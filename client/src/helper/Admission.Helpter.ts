/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import { toast } from "react-toastify";
import { useModalOptions } from "../interface/Modal.Type";

export const handleQuery = async (
  values: ApplicantModelProps,
  mutation: any
) => {
  try {
    await mutation(values);
    toast.success("Applicant Sent Successfully");
  } catch (error: any) {
    const responseError = error.response.data;
    toast.error(responseError.message);
  }
};

export const handleRegistrationReset = (
  modal: useModalOptions,
  resetForm: () => void,
  navigate: any
) => {
  modal.hideModal();
  modal.resetIndex();
  resetForm();
  navigate("/");
};
