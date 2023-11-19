/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import { toast } from "react-toastify";
import { useModalOptions } from "../interface/Modal.Type";
import {
  GradeDetails,
  GradeLevel,
  PermanentAddress,
  PersonalDetails,
  StudentDetails,
  GuardianDetails,
  OtherDetails,
  ApplicationForm,
} from "../containers/Steps";

export const OutroModalDetails = [
  {
    title: "Congratulations",
    desc: " Thank you on your admission to our school! Your examination schedule has been sent to your Facebook account.",
  },

  {
    title: "Exciting Journey",
    desc: "  As you embark on this exciting journey, please keep in mind that your registered Facebook account will serve as the primary channel for receiving all school updates.",
  },

  {
    title: "Stay Tuned",
    desc: " Stay connected to stay informed about events and important announcements. If you ever have any questions, don't hesitate to use your private account to get in touch. We're here to support you every step of the way!",
  },
];

export const RegistrationStepper = [
  { title: "Grade Level", component: GradeLevel },
  { title: "Grade Details", component: GradeDetails },
  { title: "Student Details", component: StudentDetails },
  { title: "Personal Details", component: PersonalDetails },
  { title: "Current Address", component: PermanentAddress },
  { title: "Guardian Details", component: GuardianDetails },
  { title: "Other Details", component: OtherDetails },
  { title: "Application Form", component: ApplicationForm },
];

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

// Handle Next Button for Modal
export const handleNextModal = (
  outro: useModalOptions,
  resetIndex: () => void,
  navigate: any
) => {
  if (outro.isLastIndex) handleRegistrationReset(outro, resetIndex, navigate);
  return outro.handleNext();
};
