/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Carousel from "../../components/Carousel";
import { Typography } from "../../components";
import ItemSelect from "../Form/ItemSelect";
import { yearLevels } from "../../helper/GradeLevel.Helper";
import { FetchLocalStorageFormData } from "../../helper/Registration.Helper";

const GradeLevel = () => {
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  FetchLocalStorageFormData("applicant_form");

  return (
    <section className="flex justify-center items-center flex-col  h-full mb-4 overflow-hidden ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Carousel>
          {yearLevels.map(props => (
            <ItemSelect
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
