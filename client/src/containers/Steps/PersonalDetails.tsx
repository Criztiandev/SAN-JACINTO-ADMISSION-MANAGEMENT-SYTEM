import Input from "../../components/Input";
import Select from "../../components/Select";
import { InputProps } from "../../interface/FormInterface";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import {
  GenderSelectionItems,
  PersonalDetailsFirstSection,
  PersonalDetailsSectionSection,
  suffixes,
} from "../../data/Stepper.Data";
import CustomCarousel from "./CustomCarousel";
import useLocalStorage from "../../hooks/useLocalStorage";

const PersonalDetails = () => {
  FetchLocalStorageFormData("applicant_form");
  const { getItem } = useLocalStorage("applicant_form");
  return (
    <section className="flex flex-col gap-4 mb-4">
      <div className="flex">
        <CustomCarousel
          state={getItem()?.personalDetails?.gender}
          name="personalDetails.gender"
          data={GenderSelectionItems}
          display="center"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center">
        {PersonalDetailsFirstSection.map((props: InputProps) => (
          <Input key={props.label} {...props} />
        ))}

        <Select
          label="Suffix"
          name="personalDetails.suffix"
          className="bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-[100px]">
          <option value={""}>Suffix</option>
          {suffixes.map((suff) => (
            <option value={suff}>{suff}</option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center mb-4">
        {PersonalDetailsSectionSection.map((props) => (
          <Input key={props.label} {...props} />
        ))}
      </div>
    </section>
  );
};

export default PersonalDetails;
