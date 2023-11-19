/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalOptions } from "../interface/Modal.Type";
import GradeLevel from "../containers/Steps/GradeLevel";
import GradeDetails from "../containers/Steps/GradeDetails";
import StudentDetails from "../containers/Steps/StudentDetails";
import PersonalDetails from "../containers/Steps/PersonalDetails";
import PermanentAddress from "../containers/Steps/PermanentAddress";
import GuardianDetails from "../containers/Steps/GuardianDetails";
import OtherDetails from "../containers/Steps/OtherDetails";
import ApplicationForm from "../containers/Steps/ApplicationForm";

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
