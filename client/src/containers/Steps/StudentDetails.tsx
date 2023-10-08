/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormikContext } from "formik";
import { Typography, Input } from "../../components";
import { applicantInputMaps } from "../../models/applicantModel";
import RadioItems from "../Register/RadioItems";
import { JrTracks, SHSTracks } from "../../helper/Steps/studentDetailsHelper";
import Carousel from "../../components/Carousel";

type YearLevelProps = "Grade 7" | "Grade 11";

const trackMap = (yearLevel: YearLevelProps) => {
  const track = { "Grade 7": JrTracks, "Grade 11": SHSTracks };
  return track[yearLevel] || [];
};

const StudentDetails = () => {
  const [selectedTrack, setSelectedTrack] = useState<number>(-1);
  const { details } = applicantInputMaps[0];

  // Get the grade level selected
  const { values }: any = useFormikContext();
  const currentYearLevel: YearLevelProps = values?.studentDetails?.yearLevel;

  return (
    <section>
      {trackMap(currentYearLevel).length > 0 ? (
        <div className="flex justify-center items-center flex-col ">
          <Carousel>
            {trackMap(currentYearLevel).map((items, index) => (
              <RadioItems
                {...items}
                index={index}
                state={selectedTrack}
                name={"studentDetails.track"}
                handleSelect={() => setSelectedTrack(index)}
              />
            ))}
          </Carousel>

          <Typography as="span" className="text-gray-400 pb-2 mt-4">
            Please Select Your Preffered Track
          </Typography>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <RadioItems
            title="No Available Tracks"
            subtitle="We will offer soon, stay tuned"
            name={"studentDetails.track"}
            className="w-[400px] opacity-50"
            index={0}
          />

          <Typography as="span" className="text-gray-400 pb-2 mt-4">
            Please Select Your Preffered Track
          </Typography>
        </div>
      )}

      <div className="my-8">
        <div className="grid grid-cols-2 gap-4">
          {details.map(data => (
            <Input key={data.name} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
