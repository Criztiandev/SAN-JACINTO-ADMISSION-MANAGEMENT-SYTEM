/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Typography } from "../../components";
import { ItemSelection } from "../../interface/registrationInterface";
import { useState } from "react";

const GradeLevel = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const yearLevelSelection: ItemSelection[] = [
    {
      cover: "null",
      title: "7",
      subtitle: "Freshies",
    },
    {
      cover: "null",
      title: "8",
      subtitle: "Freshies",
    },
    {
      cover: "null",
      title: "9",
      subtitle: "Freshies",
    },
    {
      cover: "null",
      title: "10",
      subtitle: "Freshies",
    },
    {
      cover: "null",
      title: "11",
      subtitle: "Freshies",
    },
    {
      cover: "null",
      title: "12",
      subtitle: "Freshies",
    },
  ];

  const handleSelected = (index: number) => setSelectedCardIndex(index);

  return (
    <section className="flex justify-center items-center  h-full mb-4">
      <Card.Select.Container className="grid grid-cols-4 gap-4  w-full h-full  justify-center">
        {yearLevelSelection.map((track, index) => (
          <Card.Select.Items
            key={track.title}
            name="studentDetails.yearLevel"
            id={track.title}
            value={track.title}
            onClick={() => handleSelected(index)}
            className={`cursor-pointer border flex flex-col justify-center items-center gap-4 rounded-[5px] ${
              index === selectedCardIndex ? "border-2 border-black" : ""
            }`}>
            <div className="w-[6vw] h-[6vw] rounded-full bg-sky-300"></div>
            <div className="text-center">
              <Typography as="h6">Grade {track.title}</Typography>
              <Typography as="span" className="text-sm text-gray-400">
                {track.subtitle}
              </Typography>
            </div>
          </Card.Select.Items>
        ))}
      </Card.Select.Container>
    </section>
  );
};

export default GradeLevel;
// className={`cursor-pointer border flex flex-col justify-center items-center gap-4 rounded-[5px] ${
//   index === selectedCardIndex
//     ? "active:border-2 hover:border-blue-400 hover:border-1 hover:bg-gray-50 hover:shadow-lg"
//     : ""
// }`}
// onClick={() => handleSelected(index)}
