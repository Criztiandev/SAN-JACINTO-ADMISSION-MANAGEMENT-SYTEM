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
    title: "Congratulations 🎉",
    desc: " Your admission is a recognition of your dedication and academic accomplishments. We're excited to welcome you to our vibrant and diverse community of learners.",
  },

  {
    title: "Exciting Journey 🗻",
    desc: "As you start this exciting journey, connect with us on Facebook for updates, events, and community engagement. Simply visit SAN JACINTO NATIONAL HIGHSCHOOL on Facebook and hit 'Like' to stay connected.",
  },

  {
    title: "Stay Tuned 💪💪",
    desc: "Stay connected on our Facebook account for event updates and important announcements. If you have questions, feel free to reach out via Facebook. We're here to support you every step of the way! 🌐📢🤝, Welcome aboard",
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
