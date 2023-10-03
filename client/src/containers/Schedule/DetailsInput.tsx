import { Typography, Input, Select } from "../../components";

const DetailsInput = () => {
  return (
    <section>
      <Typography as="h5" className="mb-4 border-b border-gray-300 pb-2">
        Details
      </Typography>

      <div className="grid grid-cols-2 gap-4 ">
        <Input label="Title" name="title" placeholder="Enter Event Title" />
        <Input label="Venue" name="venue" placeholder="Enter Venu" />
        <Select label="Audience" name="audience">
          <Select.Option value="" label="Choose Audience" />
          <Select.Option value="Grade 7" label="Grade 7" />
        </Select>
        <Input
          label="Coordinator"
          name="speaker"
          placeholder="Enter the Coordinator"
        />
      </div>
    </section>
  );
};

export default DetailsInput;
