import expressAsyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";

export const fetchMasterListByLevel = expressAsyncHandler(async (req, res) => {
  const { level } = req.query;

  const applicants = await applicantModel
    .find({
      "studentDetails.yearLevel": `Grade ${level}`,
      role: "regular",
      status: "accepted",
    })
    .lean()
    .select(
      "_id studentDetails.LRN studentDetails.schoolYear personalDetails.email personalDetails.gender personalDetails.firstName personalDetails.middleName personalDetails.lastName personalDetails.suffix gradeDetails.generalAve studentDetails.track"
    );

  if (!applicants || applicants.length === 0) {
    throw new Error("No Applicants Found");
  }

  res.status(200).json({
    payload: applicants,
    message: "Success",
  });
});

export const fetchSF1List = expressAsyncHandler(async (req, res) => {
  const { level } = req.query;

  const _applicant = await applicantModel
    .find({
      "studentDetails.yearLevel": `Grade ${level}`,
      status: "accepted",
    })
    .lean()
    .select(
      "_id personalDetails guardianDetails addressDetails.current studentDetails  "
    );

  if (!_applicant) throw new Error("Applicant Doesnt Exist");

  const getFullName = (details) =>
    `${details?.lastName} ${details?.firstName} ${details?.middleName}`;

  // oranize applicant
  // separate the female and male
  const maleApplicants = _applicant.filter(
    (field) => field?.personalDetails?.gender.toLowerCase() === "male"
  );
  const femaleApplicants = _applicant.filter(
    (field) => field?.personalDetails?.gender.toLowerCase() === "female"
  );

  const compareLastName = (a, b) =>
    a.personalDetails?.lastName.localeCompare(b.personalDetails?.lastName);

  // Sorted name
  maleApplicants.sort(compareLastName);
  femaleApplicants.sort(compareLastName);
  // sort them in alphabethical order:

  const allApplicants = [...maleApplicants, ...femaleApplicants];

  //combine them and convert it into a csv file

  const SF1Template = allApplicants.map((data) => {
    const { personalDetails, guardianDetails, addressDetails, studentDetails } =
      data;

    const toUpperCaseIfString = (value) =>
      typeof value === "string" ? value.toUpperCase() : value;

    return {
      LRN: toUpperCaseIfString(studentDetails?.LRN) || "N/A",
      NAME: getFullName(personalDetails).toUpperCase(),
      SEX: toUpperCaseIfString(personalDetails?.gender),
      "BIRTH DATE": toUpperCaseIfString(personalDetails?.birthDate),
      AGE: toUpperCaseIfString(personalDetails?.age),
      "MOTHER TONGUE":
        toUpperCaseIfString(personalDetails?.motherTongue) || "FILIPINO",
      IP: "N/A",
      RELIGION: toUpperCaseIfString(personalDetails?.religion) || "",
      "HOUSE NUMBER": toUpperCaseIfString(addressDetails?.current?.houseNo),
      STREET: toUpperCaseIfString(addressDetails?.current?.street),
      BARANGAY: toUpperCaseIfString(addressDetails?.current?.barangay),
      MUNICIPALITY: toUpperCaseIfString(addressDetails?.current?.municipality),
      PROVINCE: toUpperCaseIfString(addressDetails?.current?.province),
      "FATHER'S NAME": getFullName(guardianDetails?.father).toUpperCase(),
      "MOTHER'S NAME": getFullName(guardianDetails?.mother).toUpperCase(),
      "GUARDIAN NAME": getFullName(
        guardianDetails?.legalGuardian
      ).toUpperCase(),
      "GUARDIAN RELATIONSHIP":
        toUpperCaseIfString(guardianDetails?.legalGuardian?.relationship) ||
        "PARENT",
      "GUARDIAN CONTACT":
        toUpperCaseIfString(guardianDetails?.legalGuardian?.contact) || "N/A",
      REMARKS: "N/A",
    };
  });

  res.status(200).json({
    payload: SF1Template,
    message: "SF1 Format Fetch Successfully",
  });
});

export const fetchApplicationForm = expressAsyncHandler(async (req, res) => {
  const { level } = req.query;

  const _applicant = await applicantModel
    .find({
      "studentDetails.yearLevel": `Grade ${level}`,
      status: "accepted",
    })
    .lean()
    .select("-createdAt -updatedAt -status -__v -role");
  if (!_applicant) throw new Error("Applicant doesnt exist");

  const toUpperCaseIfString = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

  const applicationFormTemplate = _applicant.map((field) => {
    const {
      studentDetails,
      personalDetails,
      gradeDetails,
      addressDetails,
      guardianDetails,
      otherDetails,
    } = field;

    const toUpperCaseIfString = (value) =>
      typeof value === "string" ? value.toUpperCase() : value;

    return {
      LRN: toUpperCaseIfString(studentDetails?.LRN),
      "PSA#": toUpperCaseIfString(studentDetails?.PSA),
      "GRADE LEVEL": toUpperCaseIfString(studentDetails?.yearLevel),
      TRACK: toUpperCaseIfString(studentDetails?.track),
      "SCHOOL YEAR": toUpperCaseIfString(studentDetails?.schoolYear),
      "LAST SCHOOL ATTENDED": toUpperCaseIfString(
        studentDetails?.lastSchoolAttended
      ),
      "LAST NAME": toUpperCaseIfString(personalDetails?.lastName),
      "FIRST NAME": toUpperCaseIfString(personalDetails?.firstName),
      "MIDDLE NAME": toUpperCaseIfString(personalDetails?.middleName),
      SUFFIX: toUpperCaseIfString(personalDetails?.suffix),
      GENDER: toUpperCaseIfString(personalDetails?.gender),
      "BIRTH DATE": toUpperCaseIfString(personalDetails?.birthDate),
      AGE: toUpperCaseIfString(personalDetails?.age),
      EMAIL: personalDetails?.email,
      CONTACT: toUpperCaseIfString(personalDetails?.contact),
      ENGLISH: toUpperCaseIfString(gradeDetails?.english),
      FILIPINO: toUpperCaseIfString(gradeDetails?.filipino),
      MATH: toUpperCaseIfString(gradeDetails?.math),
      SCIENCE: toUpperCaseIfString(gradeDetails?.science),
      "GENEARAL AVERAGE": toUpperCaseIfString(gradeDetails?.generalAve),
      PERMANENT_HOUSE_NO: toUpperCaseIfString(
        addressDetails?.permanent?.houseNo
      ),
      PERMANENT_STREET: toUpperCaseIfString(addressDetails?.permanent?.street),
      PERMANENT_BARANGAY: toUpperCaseIfString(
        addressDetails?.permanent?.barangay
      ),
      PERMANENT_MUNICIPALITY: toUpperCaseIfString(
        addressDetails?.permanent?.municipality
      ),
      PERMANENT_PROVINCE: toUpperCaseIfString(
        addressDetails?.permanent?.province
      ),
      PERMANENT_COUNTRY: toUpperCaseIfString(
        addressDetails?.permanent?.country
      ),
      PERMANENT_ZIP: toUpperCaseIfString(addressDetails?.permanent?.zip),
      CURRENT_HOUSE_NO: toUpperCaseIfString(addressDetails?.current?.houseNo),
      CURRENT_STREET: toUpperCaseIfString(addressDetails?.current?.street),
      CURRENT_BARANGAY: toUpperCaseIfString(addressDetails?.current?.barangay),
      CURRENT_MUNICIPALITY: toUpperCaseIfString(
        addressDetails?.current?.municipality
      ),
      CURRENT_PROVINCE: toUpperCaseIfString(addressDetails?.current?.province),
      CURRENT_COUNTRY: toUpperCaseIfString(addressDetails?.current?.country),
      CURRENT_ZIP: toUpperCaseIfString(addressDetails?.current?.zip),
      "FATHER'S LASTNAME": toUpperCaseIfString(
        guardianDetails?.father?.lastName
      ),
      "FATHER'S FIRSTNAME": toUpperCaseIfString(
        guardianDetails?.father?.firstName
      ),
      "FATHER'S MIDDLENAME": toUpperCaseIfString(
        guardianDetails?.father?.middleName
      ),
      "FATHER'S SUFFIX": toUpperCaseIfString(guardianDetails?.father?.suffix),
      "FATHER'S CONTACT": toUpperCaseIfString(guardianDetails?.father?.contact),
      "MOTHERS'S LASTNAME": toUpperCaseIfString(
        guardianDetails?.mother?.lastName
      ),
      "MOTHERS'S FIRSTNAME": toUpperCaseIfString(
        guardianDetails?.mother?.firstName
      ),
      "MOTHERS'S MIDDLENAME": toUpperCaseIfString(
        guardianDetails?.mother?.middleName
      ),
      "MOTHERS'S SUFFIX": toUpperCaseIfString(guardianDetails?.mother?.suffix),
      "MOTHERS'S CONTACT": toUpperCaseIfString(
        guardianDetails?.mother?.contact
      ),
      "GUARDIAN'S LASTNAME": toUpperCaseIfString(
        guardianDetails?.legalGuardian?.lastName
      ),
      "GUARDIAN'S FIRSTNAME": toUpperCaseIfString(
        guardianDetails?.legalGuardian?.firstName
      ),
      "GUARDIAN'S MIDDLENAME": toUpperCaseIfString(
        guardianDetails?.legalGuardian?.middleName
      ),
      "GUARDIAN'S SUFFIX": toUpperCaseIfString(
        guardianDetails?.legalGuardian?.suffix
      ),
      "GUARDIAN'S CONTACT": toUpperCaseIfString(
        guardianDetails?.legalGuardian?.contact
      ),
      "4PS BENEFICIARY": toUpperCaseIfString(otherDetails?.is4psBeneficiary),
      INDIGENOUS: toUpperCaseIfString(otherDetails?.isIndigenousPerson),
      LWD: toUpperCaseIfString(otherDetails?.LWD),
    };
  });

  res.status(200).json({
    payload: applicationFormTemplate,
    message: "Applicant Fetched",
  });
});

export const fetchMasterListLevels = expressAsyncHandler(async (req, res) => {
  const _applicants = await applicantModel
    .find({ role: "regular", status: "accepted" })
    .lean()
    .select("_id studentDetails.yearLevel");

  const initialPayload = [
    { title: "Grade 7", count: 0 },
    { title: "Grade 8", count: 0 },
    { title: "Grade 9", count: 0 },
    { title: "Grade 10", count: 0 },
    { title: "Grade 11", count: 0 },
    { title: "Grade 12", count: 0 },
  ];

  // Calculate counts for each year level from _applicants
  const countsByYearLevel = _applicants.reduce((acc, applicant) => {
    const { yearLevel } = applicant.studentDetails;
    acc[yearLevel] = (acc[yearLevel] || 0) + 1;
    return acc;
  }, {});

  // Combine counts from _applicants with initialPayload
  const combinedPayload = initialPayload.map(({ title, count }) => ({
    title,
    count: (countsByYearLevel[title] || 0) + count,
  }));

  res.status(200).json({
    payload: combinedPayload,
  });
});

export const deleteSelectedList = expressAsyncHandler(async (req, res) => {
  console.log(req.body);

  res.status(200).json({ payload: null, message: "Deleted Successfully" });
});
