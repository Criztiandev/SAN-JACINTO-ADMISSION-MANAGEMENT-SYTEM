import Input from "../../components/Input";
import Typography from "../../components/Typography";

import { ItemSelection } from "../../interface/registrationInterface";
import useRadioSelect from "../../hooks/userRadioSelect";
import { Radio } from "../../components";

const TrackSelection: ItemSelection[] = [
  { cover: "null", title: "Regular", subtitle: "Regular Student" },
  { cover: "null", title: "SPE", subtitle: "Regular" },
  { cover: "null", title: "SPJ", subtitle: "Special Journalism" },
];

const StudentDetails = () => {
  const { data, currentSelectedIndex, handleSelectItem } =
    useRadioSelect(TrackSelection);
  return (
    <section className="mb-4">
      <Typography as="h5" className="mb-4">
        Select your Track
      </Typography>
      <Radio.Select.Group className="flex justify-between gap-4">
        {data.map((track, index) => (
          <Radio.Select.Item
            key={track.title}
            name="studentDetails.yearLevel"
            id={track.title}
            value={track.title}
            onClick={() => handleSelectItem(index)}
            className={`cursor-pointer w-[200px] py-12 border flex flex-col justify-center items-center gap-4 rounded-[5px] ${
              index === currentSelectedIndex ? "border-2 border-black" : ""
            }`}>
            <div className="w-[6vw] h-[6vw] rounded-full bg-sky-300"></div>
            <div className="text-center">
              <Typography as="h6">Grade {track.title}</Typography>
              <Typography as="span" className="text-sm text-gray-400">
                {track.subtitle}
              </Typography>
            </div>
          </Radio.Select.Item>
        ))}
      </Radio.Select.Group>

      <Typography as="h5" className="mb-4 mt-6">
        Details
      </Typography>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="LRN"
          name="studentDetails.LRN"
          placeholder="Enter your Leaner's Reference Number"
        />

        <Input
          label="PSA Reference #"
          name="studentDetails.PSA"
          placeholder="Enter your PSA Reference"
        />

        <Input
          label="School ID"
          name="schoolDetails.ID"
          placeholder="Enter your School ID"
        />

        <Input
          label="School Name"
          name="schoolDetails.name"
          placeholder="Enter your School name"
        />

        <Input
          label="School Year"
          name="studentDetails.schoolYear"
          placeholder="Enter your School year"
        />

        <Input
          label="School Contact"
          name="schoolDetails.contact"
          placeholder="Enter your School Contact"
        />
      </div>
    </section>
  );
};

export default StudentDetails;
