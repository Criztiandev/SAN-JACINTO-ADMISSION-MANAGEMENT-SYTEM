import { Field } from "formik";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Typography from "../../components/Typography";

const StudentDetails = () => {
  const TrackSelection = [
    { cover: null, title: "Regular", desc: "Regular Student" },
    { cover: null, title: "SPE", desc: "Regular" },
    { cover: null, title: "SPJ", desc: "Special Journalism" },
  ];
  return (
    <section className="mb-4">
      <Typography as="h5" className="mb-4">
        Select your Track
      </Typography>
      <div className="grid grid-cols-3 gap-4">
        {TrackSelection.map(track => (
          <label key={track.title}>
            <Card className="cursor-pointer w-[160px] p-4">
              <Card.Content className="flex flex-col justify-center items-center gap-4 ">
                <div className="w-16 h-16 rounded-full bg-sky-300"></div>
                <div className="text-center">
                  <Typography as="h6">{track.title}</Typography>
                  <Typography as="span" className="text-sm text-gray-400">
                    {track.desc}
                  </Typography>
                </div>
                <span className="hidden">
                  <Field
                    type="radio"
                    value={track.title}
                    name="studentDetails.track"
                  />
                </span>
              </Card.Content>
            </Card>
          </label>
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
