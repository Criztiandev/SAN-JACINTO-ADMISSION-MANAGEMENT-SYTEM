import { useState } from "react";
import { Formik, Form } from "formik";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";

import EditIcon from "../../assets/icons/Edit_light.svg";

import useFormSubmit from "../../hooks/useFormSubmit";
import useFetch from "../../hooks/useFetch";

import FetchLoader from "../General/FetchLoader";
import { finalApplicantSchmea } from "../../schema/applicant.Schema";
import Input from "../../components/Input";
import Select from "../../components/Select";
import GenerateSchoolYearOpt from "../Helpers/GenerateSchoolYearOpt";
import useURL from "../../hooks/useURL";
import { suffixes } from "../../data/Stepper.Data";

const ViewApplicant = ({ APID }: { APID: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateURL } = useURL();

  // Fetching
  const { data, isLoading, isPending, refetch } = useFetch({
    route: `/applicant/${APID}`,
    key: [`applicant-${APID}`],
    option: {
      refetchOnMount: true,
    },
  });

  // mutation
  const { handleSubmit, isPending: mutationPending } = useFormSubmit({
    route: `/applicant/${APID}`,
    overideFn: () => {
      refetch();
      updateURL("/");
    },
    type: "put",
  });

  if (isLoading || isPending)
    return (
      <div className="h-[100vh]">
        <FetchLoader />
      </div>
    );
  const { personalDetails } = data;

  return (
    <Formik
      initialValues={{
        fullName: `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName} ${personalDetails.suffix}`,
        ...data,
      }}
      onSubmit={handleSubmit}
      validationSchema={finalApplicantSchmea}>
      {({ values }) => (
        <Form>
          <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
            <div className="flex flex-col">
              {isEdit ? (
                <div>
                  <h1>Update Credentials</h1>
                </div>
              ) : (
                <h2 className="font-bold">
                  {values?.personalDetails.lastName},{" "}
                  {values?.personalDetails.firstName}{" "}
                  {values.personalDetails.middleName[0]}.{" "}
                  {values?.personalDetails.suffix}
                </h2>
              )}
              {!isEdit && (
                <span className="text-gray-400 my-2">
                  @{values?.personalDetails?.email.split("@")[0]}
                </span>
              )}
            </div>

            <IconButton
              as="outlined"
              icon={EditIcon}
              onClick={() => setIsEdit((prev) => !prev)}
              className={`p-2 border border-gray-400 rounded-full  ${
                isEdit ? "border-green-500 bg-[#22f86275]" : ""
              }`}
            />
          </header>
          <section className="">
            <div className="flex flex-col gap-4 mb-8">
              <h4 className="pb-4 border-b border-gray-400">
                Personal Details
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="personalDetails.firstName"
                  disabled={!isEdit}
                  placeholder="Enter your First name"
                />

                <Input
                  label="Middle Name"
                  type="text"
                  name="personalDetails.middleName"
                  disabled={!isEdit}
                  placeholder="Enter your Middle Name"
                />

                <Input
                  type="text"
                  name="personalDetails.lastName"
                  label="Last Name"
                  disabled={!isEdit}
                  placeholder="Enter your Last Name"
                />

                <Select
                  disabled={!isEdit}
                  label="Suffix"
                  name="personalDetails.suffix">
                  <option value={""}>Suffix</option>
                  {suffixes.map((suff) => (
                    <option key={suff} value={suff === "N/A" ? " " : suff}>
                      {suff}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Gender"
                  name="personalDetails.gender"
                  disabled={!isEdit}>
                  <option value=" ">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>

                <Input
                  type="date"
                  name="personalDetails.birthDate"
                  label="Birth Date"
                  disabled={!isEdit}
                />

                <Input
                  type="number"
                  name="personalDetails.age"
                  label="Age"
                  disabled={!isEdit}
                />

                <Input
                  label="Email"
                  type="email"
                  name="personalDetails.email"
                  placeholder="Enter your Email"
                  disabled={!isEdit}
                />

                <Input
                  label="Contact"
                  type="number"
                  name="personalDetails.contact"
                  placeholder="Enter your Contact Number"
                  disabled={!isEdit}
                />

                <Input
                  label="Facebook Link"
                  type="text"
                  name="personalDetails.facebookLink"
                  placeholder="Enter your Facebook Link"
                  disabled={!isEdit}
                />

                <Select
                  label="Religion"
                  name="personalDetails.religion"
                  disabled={!isEdit}>
                  <option value=" ">Select Religion</option>
                  <option value="ROMAN CATHOLIC">Roman Catholic</option>
                  <option value="IGLESIA NI CRISTO">Iglesia Ni Cristo</option>
                  <option value="BAPTIST">Baptist</option>
                  <option value="SAKSI NI JEHOVA">Saksi ni Jehova</option>
                  <option value="OTHER">Other</option>
                </Select>

                <Select
                  label="Mother Tongue"
                  name="personalDetails.motherTongue"
                  disabled={!isEdit}>
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
              <h4 className="pb-4 border-b border-gray-400">Student Details</h4>
              <div className="grid grid-cols-2 gap-6 items-center justify-center">
                <Input
                  label="LRN"
                  name="studentDetails.LRN"
                  placeholder="Enter your LRN"
                  disabled={!isEdit}
                />

                <Input
                  label="PSA"
                  name="studentDetails.PSA"
                  placeholder="Enter your PSA"
                  disabled={!isEdit}
                />

                <Select
                  label="Year Level"
                  name="studentDetails.yearLevel"
                  disabled={!isEdit}>
                  <option value={" "}>Please Select</option>
                  <option value={"Grade 7"}>Grade 7</option>
                  <option value={"Grade 8"}>Grade 8</option>
                  <option value={"Grade 9"}>Grade 9</option>
                  <option value={"Grade 10"}>Grade 10</option>
                  <option value={"Grade 11"}>Grade 11</option>
                  <option value={"Grade 12"}>Grade 12</option>
                </Select>

                <Select
                  label="Track"
                  name="studentDetails.track"
                  disabled={!isEdit}>
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

                <Select
                  label="School Year"
                  name="studentDetails.schoolYear"
                  disabled={!isEdit}>
                  <option value={""}>Select Year Level</option>
                  {GenerateSchoolYearOpt(2010)}
                </Select>

                <Input
                  label="Last School Attended"
                  name="studentDetails.lastSchoolAttended"
                  placeholder="Enter your Last School Attended"
                  disabled={!isEdit}
                />
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
                  disabled={!isEdit}
                />

                <Input
                  label="Filipino Grade"
                  type="number"
                  name="gradeDetails.filipino"
                  placeholder="Enter your Filipino Grade"
                  disabled={!isEdit}
                />

                <Input
                  label="Math Grade"
                  type="number"
                  name="gradeDetails.math"
                  placeholder="Enter your Math Grade"
                  disabled={!isEdit}
                />

                <Input
                  label="Science Grade"
                  type="number"
                  name="gradeDetails.science"
                  placeholder="Enter your Science Grade"
                  disabled={!isEdit}
                />

                <Input
                  label="General Weighted Average"
                  type="number"
                  name="gradeDetails.generalAve"
                  placeholder="Enter your GWA"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Street"
                  type="text"
                  name="addressDetails.permanent.street"
                  placeholder="Enter your Street"
                  disabled={!isEdit}
                />

                <Input
                  label="Barangay"
                  type="text"
                  name="addressDetails.permanent.barangay"
                  placeholder="Enter your Barangay"
                  disabled={!isEdit}
                />

                <Input
                  label="Municipality"
                  type="text"
                  name="addressDetails.permanent.municipality"
                  placeholder="Enter your Municipality"
                  disabled={!isEdit}
                />

                <Input
                  label="Province"
                  type="text"
                  name="addressDetails.permanent.province"
                  placeholder="Enter your Province"
                  disabled={!isEdit}
                />

                <Input
                  label="Country"
                  type="text"
                  name="addressDetails.permanent.country"
                  placeholder="Enter your Cointry"
                  disabled={!isEdit}
                />

                <Input
                  label="Zip"
                  type="text"
                  name="addressDetails.permanent.zip"
                  placeholder="Enter your Zip"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Street"
                  type="text"
                  name="addressDetails.current.street"
                  placeholder="Enter your Street"
                  disabled={!isEdit}
                />

                <Input
                  label="Barangay"
                  type="text"
                  name="addressDetails.current.barangay"
                  placeholder="Enter your Barangay"
                  disabled={!isEdit}
                />

                <Input
                  label="Municipality"
                  type="text"
                  name="addressDetails.current.municipality"
                  placeholder="Enter your Municipality"
                  disabled={!isEdit}
                />

                <Input
                  label="Province"
                  type="text"
                  name="addressDetails.current.province"
                  placeholder="Enter your Province"
                  disabled={!isEdit}
                />

                <Input
                  label="Country"
                  type="text"
                  name="addressDetails.current.country"
                  placeholder="Enter your Country"
                  disabled={!isEdit}
                />

                <Input
                  label="Zip"
                  type="text"
                  name="addressDetails.current.zip"
                  placeholder="Enter your Zip"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Father's Middle Name"
                  type="text"
                  name="guardianDetails.father.middleName"
                  placeholder="Enter your  Father's Middle Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Father's Last Name"
                  type="text"
                  name="guardianDetails.father.lastName"
                  placeholder="Enter your  Father's Last Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Father's Contact Number"
                  type="text"
                  name="guardianDetails.father.contact"
                  placeholder="Enter your  Father's Contact"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Mother's Middle Name"
                  type="text"
                  name="guardianDetails.mother.middleName"
                  placeholder="Enter your  Mother's Middle Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Mother's Last Name"
                  type="text"
                  name="guardianDetails.mother.lastName"
                  placeholder="Enter your  Mother's Last Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Mother's Contact Number"
                  type="text"
                  name="guardianDetails.mother.contact"
                  placeholder="Enter your  Mother's Contact"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Legal Guardian's Middle Name"
                  type="text"
                  name="guardianDetails.legalGuardian.middleName"
                  placeholder="Enter your  Legal Guardian's Middle Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Legal Guardian's Last Name"
                  type="text"
                  name="guardianDetails.legalGuardian.lastName"
                  placeholder="Enter your  Legal Guardian's Last Name"
                  disabled={!isEdit}
                />

                <Input
                  label="Legal Guardian's Contact Number"
                  type="text"
                  name="guardianDetails.legalGuardian.contact"
                  placeholder="Enter your  Legal Guardian's Contact"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />

                <Input
                  label="Are you a Indigenous People"
                  type="text"
                  name="otherDetails.isIndigenousPerson"
                  placeholder="Please Specify"
                  disabled={!isEdit}
                />

                <Input
                  label="Are you a LWD"
                  type="text"
                  name="otherDetails.isLWD"
                  placeholder="Please Specify"
                  disabled={!isEdit}
                />
              </div>
            </div>
          </section>

          <section className="flex justify-end gap-4 w-full ">
            {isEdit && (
              <>
                <Button
                  as="outlined"
                  type="button"
                  title="Reset"
                  onClick={() => setIsEdit(false)}
                />

                <Button
                  as="contained"
                  type="submit"
                  title="Update"
                  disabled={mutationPending}
                />
              </>
            )}
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default ViewApplicant;
