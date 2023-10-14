/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Carousel from "../../components/Carousel";
import RadioItems from "../Register/RadioItems";
import { ItemSelection } from "../../interface/registrationInterface";
import { Typography } from "../../components";

const yearLevels: ItemSelection[] = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

const GradeLevel = () => {
  const [yearSelect, setYearSelect] = useState<number>(-1);

  return (
    <section className="flex justify-center items-center flex-col  h-full mb-4 overflow-hidden ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Carousel>
          {yearLevels.map((props, index) => (
            <RadioItems
              key={props.title}
              {...props}
              index={index}
              state={yearSelect}
              name="studentDetails.yearLevel"
              handleSelect={() => setYearSelect(index)}
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
