/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext } from "formik";
import { Typography, Input, Select } from "../../components";
import { applicantInputMaps } from "../../models/applicantInitialValue";

import ItemSelect from "../Form/ItemSelect";
import { OmitInputObject } from "../../utils/OmitUtils";
import { motion } from "framer-motion";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import { GradeLevelTrack } from "../../helper/GradeLevel.Helper";
import GenerateSchoolYearOpt from "../Helpers/GenerateSchoolYearOpt";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import CustomCarousel from "./CustomCarousel";

const StudentDetails = () => {
  FetchLocalStorageFormData("applicant_form");

  const { model } = applicantInputMaps[0];

  const { values }: any = useFormikContext<ApplicantModelProps>();
  const { studentDetails, gradeDetails } = values;
  const { yearLevel: currentYearLevel } = studentDetails;
  const preferedTrack = GradeLevelTrack(gradeDetails, currentYearLevel);

  return (
    <section>
      {preferedTrack.length > 0 ? (
        <CustomCarousel data={preferedTrack} />
      ) : (
        <InvalidTrack />
      )}

      <div className="my-8">
        <div className="grid grid-cols-2 gap-4">
          {OmitInputObject(
            ["Year Level", "Track", "School Year", "Last School Attended"],
            model
          ).map((props) => (
            <motion.div key={props.label} whileHover={{ scale: 1.03 }}>
              <Input {...props} />
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.03 }}>
            <Select label="School Year" name="studentDetails.schoolYear">
              <option value={""}>Select Year Level</option>
              {GenerateSchoolYearOpt(2005)}
            </Select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Input
              label="Last School Attended"
              name="studentDetails.lastSchoolAttended"
              placeholder="Enter your Last School Attended"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InvalidTrack = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <ItemSelect cover="" title="Invalid Track" subtitle="Unavailable" />
      <Typography as="span" className="text-gray-400 pb-2 mt-4">
        Please Select Your Preffered Track
      </Typography>
    </div>
  );
};

export default StudentDetails;
