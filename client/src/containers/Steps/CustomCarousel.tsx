/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Typography } from "../../components";
import Carousel from "../../components/Carousel";

interface CustomCarouselProps {
  data: Array<object>;
}

const CustomCarousel = ({ data }: CustomCarouselProps) => {
  const [selectedTrack, setSelectedTrack] = useState("");
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Carousel direction="center">
        {/* Render the selected Track */}
        {data.map((props: any) => (
          <Carousel.Item
            key={props.title}
            {...props}
            select={selectedTrack}
            onSelect={setSelectedTrack}
            name="studentDetails.track"
          />
        ))}
      </Carousel>
      <Typography as="span" className="text-gray-400 pb-2 mt-4">
        Please Select Your Gender
      </Typography>
    </div>
  );
};

export default CustomCarousel;
