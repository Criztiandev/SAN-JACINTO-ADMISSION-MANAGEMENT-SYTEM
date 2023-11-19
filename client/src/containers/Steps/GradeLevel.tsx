/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Carousel from "../../components/Carousel";
import { Typography } from "../../components";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { yearLevelItem } from "../../data/Stepper.Data";

const GradeLevel = () => {
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  FetchLocalStorageFormData("applicant_form");

  return (
    <section className="flex justify-center items-center flex-col  h-full mb-4 overflow-hidden ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Carousel>
          {yearLevelItem.map((props) => (
            <Carousel.Item
              key={props.title}
              {...props}
              select={selectedYearLevel}
              onSelect={setSelectedYearLevel}
              name="studentDetails.yearLevel"
            />
          ))}
        </Carousel>
        <Typography as="span" className="text-gray-400 pb-2 mt-4">
          Please Select Your Preffered Track
        </Typography>
      </div>
    </section>
  );
};

export default GradeLevel;
