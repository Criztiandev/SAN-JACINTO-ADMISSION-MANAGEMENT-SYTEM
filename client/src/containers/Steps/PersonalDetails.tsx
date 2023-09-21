import Input from "../../components/Input";
import Select from "../../components/Select";

const PersonalDetails = () => {
  return (
    <section className="grid grid-cols-2 gap-4 items-center justify-center ">
      <Input
        label="First Name"
        name="personalDetails.firstName"
        placeholder="Enter your First Name"
      />
      <Input
        label="Middle Name"
        name="personalDetails.middleName"
        placeholder="Enter your Middle Name"
      />
      <Input
        label="Last Name"
        name="personalDetails.lastName"
        placeholder="Enter your Last Name"
      />
      <Input
        label="Suffix"
        name="personalDetails.suffix"
        placeholder="Enter your Suffix"
      />
      <Select
        label="Gender"
        name="personalDetails.gender"
        placeholder="Enter your Gender">
        <option value={""}>Please Select a Gender</option>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
      </Select>
      <Input type="date" label="Birthdate" name="personalDetails.birthdate" />

      <Input
        label="Age"
        name="personalDetails.age"
        placeholder="Enter your Age"
      />

      <Input label="Mother Tounge" name="personalDetails.motherTounge" />

      <Input
        label="Email"
        name="personalDetails.gmail"
        placeholder="Enter your email"
      />

      <Input
        label="Contact"
        name="personalDetails.contact"
        placeholder="Enter your number"
      />
    </section>
  );
};

export default PersonalDetails;
