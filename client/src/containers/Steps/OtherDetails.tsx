import Input from "../../components/Input";
import {
  FetchLocalStorageFormData,
  OtherInputData,
} from "../../helper/ApplicantionForm.Helper";
const OtherDetails = () => {
  FetchLocalStorageFormData("applicant_form");

  return (
    <section className="grid grid-cols-2 gap-8 items-start  ">
      {OtherInputData.map(props => (
        <Input key={props.label} {...props} />
      ))}
    </section>
  );
};

export default OtherDetails;
