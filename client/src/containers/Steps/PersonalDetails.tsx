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
import { OmitInputObject } from "../../utils/OmitUtils";

const PersonalDetails = () => {
  FetchLocalStorageFormData("applicant_form");
  const { getItem } = useLocalStorage("applicant_form");
  return (
    <section className="flex flex-col gap-4 mb-4">
      <div className="flex mb-2">
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
            <option value={suff === "N/A" ? " " : suff}>{suff}</option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center ">
        {OmitInputObject(
          ["Religion", "Mother Tongue", "Facebook Link"],
          PersonalDetailsSectionSection
        ).map((props) => (
          <Input key={props.label} {...props} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center">
        <Select label="Religion" name="personalDetails.religion">
          <option value=" ">Select Religion</option>
          <option value="ROMAN CATHOLIC">Roman Catholic</option>
          <option value="IGLESIA NI CRISTO">Iglesia Ni Cristo</option>
          <option value="BAPTIST">Baptist</option>
          <option value="SAKSI NI JEHOVA">Saksi ni Jehova</option>
          <option value="OTHER">Other</option>
        </Select>

        <Select label="Mother Tongue" name="personalDetails.motherTongue">
          <option value=" ">Select Mother Tongue</option>
          <option value="FILIPINO">Filipino</option>
          <option value="TAGALOG">Tagalog</option>
          <option value="CEBUANO">Cebuano</option>
          <option value="ILONGGO">Ilonggo</option>
          <option value="WARAY">Waray</option>
          <option value="BICOLANO">Bicolano</option>
          <option value="PANGASINENSE">Pangasinense</option>
          <option value="ILOCANO">Ilocano</option>
        </Select>
      </div>
    </section>
  );
};

export default PersonalDetails;
