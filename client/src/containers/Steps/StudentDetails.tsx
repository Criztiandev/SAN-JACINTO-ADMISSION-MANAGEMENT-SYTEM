/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormikContext } from "formik";
import { Typography, Input } from "../../components";
import { applicantInputMaps } from "../../models/applicantInitialValue";
import { JrTracks, SHSTracks } from "../../helper/Steps/studentDetailsHelper";
import Carousel from "../../components/Carousel";
import { InputProps } from "../../interface/FormInterface";
import ItemSelect from "../Form/ItemSelect";

type YearLevelProps = "Grade 7" | "Grade 11";

const GradeLevelTrack = (level: "Grade 7" | "Grade 11") => {
  const trackMapping = {
    "Grade 7": JrTracks,
    "Grade 11": SHSTracks,
  };

  // Return the corresponding tracks or an empty array if not found
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
          {details.map((props: InputProps) => (
            <Input key={props.name} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
