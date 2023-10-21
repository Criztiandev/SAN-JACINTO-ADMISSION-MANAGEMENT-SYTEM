/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormikContext } from "formik";
import { Typography, Input, Select } from "../../components";
import { applicantInputMaps } from "../../models/applicantInitialValue";
import { JrTracks, SHSTracks } from "../../helper/Steps/studentDetailsHelper";
import Carousel from "../../components/Carousel";
import { InputProps } from "../../interface/FormInterface";
import ItemSelect from "../Form/ItemSelect";
import { OmitInputObject } from "../../utils/OmitUtils";

type YearLevelProps = "Grade 7" | "Grade 11";

const generateSchoolYearOption = (target = 2005) => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let year = target; year <= currentYear; year++) {
    const schoolYear = `${year} - ${
      year + 1 === currentYear + 1 ? "Current" : year + 1
    }`;

    options.push(
      <option key={schoolYear} value={schoolYear}>
        {schoolYear}
      </option>
    );
  }

  return options || [];
};

const GradeLevelTrack = (level: "Grade 7" | "Grade 11") => {
  const trackMapping = {
    "Grade 7": JrTracks,
    "Grade 11": SHSTracks,
  };

  return trackMapping[level] || [];
};

const StudentDetails = () => {
  const [selectedTrack, setSelectedTrack] = useState("");
  const { details } = applicantInputMaps[0];

  const { values }: any = useFormikContext();
  const currYearLevel: YearLevelProps = values?.studentDetails?.yearLevel;

  return (
    <section>
      {GradeLevelTrack(currYearLevel).length > 0 ? (
        <div className="flex justify-center items-center flex-col ">
          <Carousel>
            {GradeLevelTrack(currYearLevel).map(props => (
              <ItemSelect
                key={props.title}
                {...props}
                select={selectedTrack}
                onSelect={setSelectedTrack}
                name="studentDetails.track"
              />
            ))}
          </Carousel>

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
            details
          ).map(props => (
            <Input {...props} />
          ))}
          <Select label="School Year" name="studentDetails.schoolYear">
            <option value={""}>Select Year Level</option>
            {generateSchoolYearOption(2005)}
          </Select>

          <Input
            label="Last School Attended"
            name="studentDetails.lastSchoolAttended"
            placeholder="Enter your Last School Attended"
          />
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
