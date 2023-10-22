/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormikContext } from "formik";
import { Typography, Input, Select } from "../../components";
import { applicantInputMaps } from "../../models/applicantInitialValue";

import Carousel from "../../components/Carousel";
import ItemSelect from "../Form/ItemSelect";
import { OmitInputObject } from "../../utils/OmitUtils";
import { motion } from "framer-motion";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import { GradeLevelTrack } from "../../helper/GradeLevel.Helper";
import GenerateSchoolYearOpt from "../Helpers/GenerateSchoolYearOpt";

type YearLevelProps = "Grade 7" | "Grade 11";

const StudentDetails = () => {
  const [selectedTrack, setSelectedTrack] = useState("");
  const { model } = applicantInputMaps[0];

  const { values }: any = useFormikContext<ApplicantModelProps>();
  const { studentDetails, gradeDetails } = values;

  const currYearLevel: YearLevelProps = studentDetails?.yearLevel;
  const currentTrack = GradeLevelTrack(gradeDetails, currYearLevel);
  const levelLength = currentTrack.length;
  const renderTracks = currentTrack.map(props => (
    <ItemSelect
      key={props.title}
      {...props}
      select={selectedTrack}
      onSelect={setSelectedTrack}
      name="studentDetails.track"
    />
  ));

  return (
    <section>
      {levelLength > 0 ? (
        <div className="flex justify-center items-center flex-col ">
          <Carousel direction="center">{renderTracks}</Carousel>
          <Typography as="span" className="text-gray-400 pb-2 mt-4">
            Please Select Your Preffered Track
          </Typography>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <ItemSelect cover="" title="Invalid Track" subtitle="Unavailable" />
          <Typography as="span" className="text-gray-400 pb-2 mt-4">
            Please Select Your Preffered Track
          </Typography>
        </div>
      )}

      <div className="my-8">
        <div className="grid grid-cols-2 gap-4">
          {OmitInputObject(
            ["Year Level", "Track", "School Year", "Last School Attended"],
            model
          ).map(props => (
            <motion.div whileHover={{ scale: 1.03 }}>
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

export default StudentDetails;
