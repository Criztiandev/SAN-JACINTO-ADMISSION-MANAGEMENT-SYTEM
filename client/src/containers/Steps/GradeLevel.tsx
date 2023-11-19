/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Carousel from "../../components/Carousel";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { yearLevelItem } from "../../data/Stepper.Data";
import Typography from "../../components/Typography";
import useLocalStorage from "../../hooks/useLocalStorage";
const GradeLevel = () => {
  FetchLocalStorageFormData("applicant_form");
  const { getItem } = useLocalStorage("applicant_form");
  const [selected, setSelected] = useState(
    getItem()?.studentDetails?.yearLevel || ""
  );

  return (
    <section className="flex justify-center items-center flex-col  h-full mb-4 overflow-hidden ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Carousel>
          {yearLevelItem.map((props) => (
            <div onClick={() => setSelected(props.title)}>
              <Carousel.Item
                active={selected === props.title}
                key={props.title}
                {...props}
                name="studentDetails.yearLevel"
                value={props.title}
              />
            </div>
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
