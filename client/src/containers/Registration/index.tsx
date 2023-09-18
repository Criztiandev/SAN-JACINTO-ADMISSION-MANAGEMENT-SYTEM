import CheckPoint from "../../pages/CheckPoint";
import AccountDetails from "./AccountDetails";
import ApplicationForm from "./ApplicationForm";
import GradeLevel from "./GradeLevel";
import GuardianDetails from "./GuardianDetails";
import OtherDetails from "./OtherDetails";
import Outro from "./Outro";
import PermanentAddress from "./PermanentAddress";
import PersonalDetails from "./PersonalDetails";
import StudentDetails from "./StudentDetails";

const Registration = () => {
  return <div>Registration</div>;
};

Registration.Steps = {
  GradeLevel,
  StudentDetails,
  PersonalDetails,
  PermanentAddress,
  GuardianDetails,
  OtherDetails,
  AccountDetails,
  CheckPoint,
  ApplicationForm,
  Outro,
};

export default Registration;
