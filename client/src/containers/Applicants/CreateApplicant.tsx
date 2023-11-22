import { Formik, Form } from "formik";

import useFormSubmit from "../../hooks/useFormSubmit";
import applicantInitialValue from "../../data/initialValue/applicantInit";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { finalApplicantSchmea } from "../../schema/applicant.Schema";
import GenerateSchoolYearOpt from "../Helpers/GenerateSchoolYearOpt";
import { suffixes } from "../../data/Stepper.Data";
import useURL from "../../hooks/useURL";

const CreateApplicant = () => {
  const { updateURL } = useURL();
  // mutation
  const { handleSubmit, isPending } = useFormSubmit({
    route: "/applicant/create",
    redirect: "/applicants",
    overideFn: () => {
      updateURL("refetch=true");
    },
    type: "post",
  });

  return (
    <Formik
      initialValues={applicantInitialValue}
      onSubmit={handleSubmit}
      validationSchema={finalApplicantSchmea}>
      {({ values }) => (
        <Form className="">
          <section className="">
            <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end"></div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">Student Details</h4>
              <div className="grid grid-cols-2 gap-6 items-center justify-center">
                <Input
                  label="LRN"
                  name="studentDetails.LRN"
                  placeholder="Enter your LRN"
                />

                <Input
                  label="PSA"
                  name="studentDetails.PSA"
                  placeholder="Enter your PSA"
                />

                <Select label="Year Level" name="studentDetails.yearLevel">
                  <option value={" "}>Please Select</option>
                  <option value={"Grade 7"}>Grade 7</option>
                  <option value={"Grade 8"}>Grade 8</option>
                  <option value={"Grade 9"}>Grade 9</option>
                  <option value={"Grade 10"}>Grade 10</option>
                  <option value={"Grade 11"}>Grade 11</option>
                  <option value={"Grade 12"}>Grade 12</option>
                </Select>

                <Select label="Track" name="studentDetails.track">
                  <option value={" "}>Please Select</option>
                  <option value={"Regular"}>Regular</option>

                  {values?.studentDetails.yearLevel === "Grade 7" && (
                    <>
                      <option value={"SPE"}>SPE</option>
                      <option value={"SPJ"}>SPJ</option>
                    </>
                  )}

                  {values?.studentDetails?.yearLevel === "Grade 11" ||
                  values?.studentDetails?.yearLevel === "Grade 12" ? (
                    <>
                      <option value={"GAS"}>
                        (GAS) General Academic Strand
                      </option>
                      <option value={"STEM"}>
                        (STEM) Science, Technology, Engineering, and Mathematics
                      </option>
                      <option value={"ABM"}>
                        (ABM) Accountancy Business Management
                      </option>
                      <option value={"EIM"}>
                        (EIM) Electrical Installation and Maintenance
                      </option>
                      <option value={"ICT"}>
                        (ICT) Information Communication and Technology
                      </option>
                      <option value={"BPP"}>
                        (BPP) Bread and Pastry Production
                      </option>
                    </>
                  ) : null}
                </Select>

                <Select label="School Year" name="studentDetails.schoolYear">
                  <option value={""}>Select Year Level</option>
                  {GenerateSchoolYearOpt(2010)}
                </Select>

                <Input
                  label="Last School Attended"
                  name="studentDetails.lastSchoolAttended"
                  placeholder="Enter your Last School Attended"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">
                Personal Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="personalDetails.firstName"
                  placeholder="Enter your First name"
                />

                <Input
                  label="Middle Name"
                  name="personalDetails.middleName"
                  placeholder="Enter your Middle name"
                />

                <Input
                  label="Last Name"
                  name="personalDetails.lastName"
                  placeholder="Enter your Last name"
                />

                <Select
                  label="Suffix"
                  name="personalDetails.suffix"
                  className="bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-[100px]">
                  <option value={""}>Suffix</option>
                  {suffixes.map((suff) => (
                    <option key={suff} value={suff}>
                      {suff}
                    </option>
                  ))}
                </Select>

                <Select label="Gender" name="personalDetails.gender">
                  <option value=" ">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>

                <Input
                  type="date"
                  name="personalDetails.birthDate"
                  label="Birth Date"
                />

                <Input type="number" name="personalDetails.age" label="Age" />

                <Input
                  label="Email"
                  type="email"
                  name="personalDetails.email"
                  placeholder="Enter your Email"
                />

                <Input
                  label="Contact"
                  type="number"
                  name="personalDetails.contact"
                  placeholder="Enter your Contact Number"
                />

                <Input
                  label="Facebook Link"
                  type="text"
                  name="personalDetails.facebookLink"
                  placeholder="Enter your Facebook Link"
                />

                <Select label="Religion" name="personalDetails.religion">
                  <option value=" ">Select Religion</option>
                  <option value="ROMAN CATHOLIC">Roman Catholic</option>
                  <option value="IGLESIA NI CRISTO">Iglesia Ni Cristo</option>
                  <option value="BAPTIST">Baptist</option>
                  <option value="SAKSI NI JEHOVA">Saksi ni Jehova</option>
                  <option value="OTHER">Other</option>
                </Select>

                <Select
                  label="Mother Tongue"
                  name="personalDetails.motherTongue">
                  <option value=" ">Select Mother Tongue</option>
                  <option value="FILIPINO">Filipino</option>
                  <option value="TAGALOG">Tagalog</option>
                  <option value="CEBUANO">Cebuano</option>
                  <option value="ILONGGO">Ilonggo</option>
                  <option value="WARAY">Waray</option>
                  <option value="BICOLANO">Bicolano</option>
                  <option value="PANGASINENSE">Pangasinense</option>
                  <option value="ILOCANO">Ilocano</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">Grade Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="English Grade"
                  type="number"
                  name="gradeDetails.english"
                  placeholder="Enter your English Grade"
                />

                <Input
                  label="Filipino Grade"
                  type="number"
                  name="gradeDetails.filipino"
                  placeholder="Enter your Filipino Grade"
                />

                <Input
                  label="Math Grade"
                  type="number"
                  name="gradeDetails.math"
                  placeholder="Enter your Math Grade"
                />

                <Input
                  label="Science Grade"
                  type="number"
                  name="gradeDetails.science"
                  placeholder="Enter your Science Grade"
                />

                <Input
                  label="General Weighted Average"
                  type="number"
                  name="gradeDetails.generalAve"
                  placeholder="Enter your GWA"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">
                Permanent Address Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="House No"
                  type="number"
                  name="addressDetails.permanent.houseNo"
                  placeholder="Enter your House No."
                />

                <Input
                  label="Street"
                  type="text"
                  name="addressDetails.permanent.street"
                  placeholder="Enter your Street"
                />

                <Input
                  label="Barangay"
                  type="text"
                  name="addressDetails.permanent.barangay"
                  placeholder="Enter your Barangay"
                />

                <Input
                  label="Municipality"
                  type="text"
                  name="addressDetails.permanent.municipality"
                  placeholder="Enter your Municipality"
                />

                <Input
                  label="Province"
                  type="text"
                  name="addressDetails.permanent.province"
                  placeholder="Enter your Province"
                />

                <Input
                  label="Country"
                  type="text"
                  name="addressDetails.permanent.country"
                  placeholder="Enter your Cointry"
                />

                <Input
                  label="Zip"
                  type="text"
                  name="addressDetails.permanent.zip"
                  placeholder="Enter your Zip"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">
                Current Address Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="House No"
                  type="number"
                  name="addressDetails.current.houseNo"
                  placeholder="Enter your House No."
                />

                <Input
                  label="Street"
                  type="text"
                  name="addressDetails.current.street"
                  placeholder="Enter your Street"
                />

                <Input
                  label="Barangay"
                  type="text"
                  name="addressDetails.current.barangay"
                  placeholder="Enter your Barangay"
                />

                <Input
                  label="Municipality"
                  type="text"
                  name="addressDetails.current.municipality"
                  placeholder="Enter your Municipality"
                />

                <Input
                  label="Province"
                  type="text"
                  name="addressDetails.current.province"
                  placeholder="Enter your Province"
                />

                <Input
                  label="Country"
                  type="text"
                  name="addressDetails.current.country"
                  placeholder="Enter your Country"
                />

                <Input
                  label="Zip"
                  type="text"
                  name="addressDetails.current.zip"
                  placeholder="Enter your Zip"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">Father Detais</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Father's First Name"
                  type="text"
                  name="guardianDetails.father.firstName"
                  placeholder="Enter your Father's First Name"
                />

                <Input
                  label="Father's Middle Name"
                  type="text"
                  name="guardianDetails.father.middleName"
                  placeholder="Enter your  Father's Middle Name"
                />

                <Input
                  label="Father's Last Name"
                  type="text"
                  name="guardianDetails.father.lastName"
                  placeholder="Enter your  Father's Last Name"
                />

                <Input
                  label="Father's Contact Number"
                  type="text"
                  name="guardianDetails.father.contact"
                  placeholder="Enter your  Father's Contact"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">Mother Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Mother's First Name"
                  type="text"
                  name="guardianDetails.mother.firstName"
                  placeholder="Enter your Mother's First Name"
                />

                <Input
                  label="Mother's Middle Name"
                  type="text"
                  name="guardianDetails.mother.middleName"
                  placeholder="Enter your  Mother's Middle Name"
                />

                <Input
                  label="Mother's Last Name"
                  type="text"
                  name="guardianDetails.mother.lastName"
                  placeholder="Enter your  Mother's Last Name"
                />

                <Input
                  label="Mother's Contact Number"
                  type="text"
                  name="guardianDetails.mother.contact"
                  placeholder="Enter your  Mother's Contact"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">
                Legal Guardian Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Legal Guardian's First Name"
                  type="text"
                  name="guardianDetails.legalGuardian.firstName"
                  placeholder="Enter your Legal Guardian's First Name"
                />

                <Input
                  label="Legal Guardian's Middle Name"
                  type="text"
                  name="guardianDetails.legalGuardian.middleName"
                  placeholder="Enter your  Legal Guardian's Middle Name"
                />

                <Input
                  label="Legal Guardian's Last Name"
                  type="text"
                  name="guardianDetails.legalGuardian.lastName"
                  placeholder="Enter your  Legal Guardian's Last Name"
                />

                <Input
                  label="Legal Guardian's Contact Number"
                  type="text"
                  name="guardianDetails.legalGuardian.contact"
                  placeholder="Enter your  Legal Guardian's Contact"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">Other Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Are you a 4ps Beneficiary"
                  type="text"
                  name="otherDetails.is4psBeneficiary"
                  placeholder="Please Specify"
                />

                <Input
                  label="Are you a Indigenous People"
                  type="text"
                  name="otherDetails.isIndigenousPerson"
                  placeholder="Please Specify"
                />

                <Input
                  label="Are you a LWD"
                  type="text"
                  name="otherDetails.isLWD"
                  placeholder="Please Specify"
                />
              </div>
            </div>
          </section>

          <section className="flex justify-end gap-4 w-full ">
            <Button
              as="contained"
              type="submit"
              title="Create"
              disabled={isPending}
            />
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default CreateApplicant;
