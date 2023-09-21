/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio, Typography } from "../../components";
import useRadioSelect from "../../hooks/userRadioSelect";
import { ItemSelection } from "../../interface/registrationInterface";

const GradeLevel = () => {
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
  const { data, currentSelectedIndex, handleSelectItem } =
    useRadioSelect(yearLevelSelection);

  return (
    <section className="flex justify-center items-center  h-full mb-4">
      <Radio.Select.Group className="grid grid-cols-4 gap-4  w-full h-full  justify-center">
        {data.map((track, index) => (
          <Radio.Select.Item
            key={track.title}
            name="studentDetails.yearLevel"
            id={track.title}
            value={track.title}
            onClick={() => handleSelectItem(index)}
            className={`bg-white border  shadow-[0px_0px_3px_##919eab29] cursor-pointer flex flex-col justify-center items-center gap-4 rounded-[5px] ${
              index === currentSelectedIndex
                ? "border-2 border-gray-200 shadow-lg"
                : "border-gray-300"
            }`}>
            <div className="w-[6vw] h-[6vw] rounded-full bg-sky-300"></div>
            <div className="text-center">
              <Typography as="h5">Grade {track.title}</Typography>
              <Typography as="span" className="text-sm text-gray-400">
                {track.subtitle}
              </Typography>
            </div>
          </Radio.Select.Item>
        ))}
      </Radio.Select.Group>
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
