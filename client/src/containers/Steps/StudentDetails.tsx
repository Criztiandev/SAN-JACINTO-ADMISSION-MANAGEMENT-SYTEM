import { Field } from "formik";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Typography from "../../components/Typography";

import { useState } from "react";
import { ItemSelection } from "../../interface/registrationInterface";

const TrackSelection: ItemSelection[] = [
  { cover: "null", title: "Regular", subtitle: "Regular Student" },
  { cover: "null", title: "SPE", subtitle: "Regular" },
  { cover: "null", title: "SPJ", subtitle: "Special Journalism" },
];

const StudentDetails = () => {
  // get the fomik value

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const handleSelected = (index: number) => {
    setSelectedCardIndex(index);
  };

  return (
    <section className="mb-4">
      <Typography as="h5" className="mb-4">
        Select your Track
      </Typography>
      <div className="grid grid-cols-3 gap-4">
        {TrackSelection.map((track, index) => (
          <Card
            key={track.title}
            as="label"
            className={`cursor-pointer p-8 border flex flex-col justify-center items-center gap-4 rounded-[5px] ${
              index === selectedCardIndex
                ? "active:border-2 hover:border-blue-400 hover:border-1 hover:bg-gray-50 hover:shadow-lg"
                : ""
            }`}
            onClick={() => handleSelected(index)}>
            <div className="w-[6vw] h-[6vw] rounded-full bg-sky-300"></div>
            <div className="text-center">
              <Typography as="h6">{track.title}</Typography>
              <Typography as="span" className="text-sm text-gray-400">
                {track.subtitle}
              </Typography>
            </div>

            <Field
              type="radio"
              name="studentDetails.track"
              id={track.title}
              value={track.title}
              className="hidden"
            />
          </Card>
        ))}
      </div>

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
