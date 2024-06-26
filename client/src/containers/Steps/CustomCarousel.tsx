/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Carousel from "../../components/Carousel";
import Typography from "../../components/Typography";

interface CustomCarouselProps {
  data: Array<object>;
  name: string;
  state: string;
  display?: "left" | "center";
}

const CustomCarousel = ({
  data,
  name,
  state,
  display = "left",
}: CustomCarouselProps) => {
  const [selectedTrack, setSelectedTrack] = useState(state || "");
  return (
    <div className="border ">
      <Carousel direction={display}>
        {data.map((props: any) => (
          <div onClick={() => setSelectedTrack(props.title)}>
            <Carousel.Item
              active={selectedTrack === props.title}
              key={props.title}
              {...props}
              name={name}
              value={props.title}
            />
          </div>
        ))}
      </Carousel>
      <Typography as="span" className="text-gray-400 pb-2 mt-4">
        Please Select Your Gender
      </Typography>
    </div>
  );
};

export default CustomCarousel;
