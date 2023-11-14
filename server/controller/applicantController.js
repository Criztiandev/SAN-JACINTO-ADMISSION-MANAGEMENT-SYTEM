import asyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import { sendEmail } from "../utils/email.uitls.js";

const validateFields = async (flagArray) => {
  for (const flag of flagArray) {
    const { field, value } = flag;
    const credentials = await applicantModel.findOne({ [field]: value });
    if (credentials)
      throw new Error(
        `Applicant with ${key.split(".")[1] || key} '${target}' already exist`
      );
  }
};

export const createApplicant = asyncHandler(async (req, res) => {
  const { studentDetails, personalDetails } = req.body;
  const { LRN, PSA } = studentDetails;
  const { email, contact } = personalDetails;

  // Check for existing records
  const flags = [
    { field: "studentDetails.LRN", value: LRN },
    { field: "studentDetails.PSA", value: PSA },
    { field: "personalDetails.email", value: email },
    { field: "personalDetails.contac", value: contact },
  ];

  // Validate Input
  await validateFields(field);

  // create Applicant
  const newApplicant = await applicantModel.create(req.body);
  if (!newApplicant) throw new Error("Server Error. Please Try again");

  // Email
  sendEmail({
    target: email,
    title: "Application Form Confirmation ",
    body: "Hi Im Criztan This is the Test Email my Friend",
  });

  res.status(201).json({ message: "Applicant created successfully" });
});

export const fetchAllApplicant = asyncHandler(async (req, res) => {
  const fields =
    "_id studentDetails.LRN studentDetails.yearLevel personalDetails guardianDetails.legalGuardian gradeDetails.generalAve status";

  const applicants = await applicantModel
    .find({ status: "pending" })
    .select(fields);

  res.status(200).json({
    payload: applicants,
    message:
      applicants.length <= 0 ? "No Applicant Found" : "Fetched All Applicant",
  });
});

export const fetchApplicantByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const applicant = await applicantModel.findById(id).lean();
  if (!applicant) throw new Error("Applicant Not Found");

  res
    .status(200)
    .json({ payload: applicant, message: "Applicant Fetch Successfully" });
});

export const updateApplicant = asyncHandler(async (req, res) => {
  const { id: APID } = req.params;
  const payload = req.body;

  const _applicant = await applicantModel
    .findOneAndUpdate({ _id: APID }, payload, { new: true })
    .lean()
    .select("_id");

  if (!_applicant) throw new Error("Applicant Doest Found, Please Try Again");

  res.status(200).json({
    payload: _applicant,
    message: "Updated Credentials Successfully",
  });
});

export const deleteApplicant = asyncHandler(async (req, res) => {
  const { id: APID } = req.params;

  const _applicant = await applicantModel
    .findByIdandDelete(APID)
    .lean()
    .select("_id");

  if (!_applicant) throw new Error("Applicant Doesnt Found, Please Try again");

  res.status(200).json({
    payload: _applicant._id,
    message: "Applicant is Deleted Successfully",
  });
});

export const acceptApplicant = asyncHandler(async (req, res) => {
  const { UID } = req.body;

  const filterField =
    " _id studentDetails.yearLevel studentDetails.track role status";

  // find the applicant
  const _applicant = await applicantModel
    .findOne({ _id: UID })
    .lean()
    .select(filterField);
  if (!_applicant) throw new Error("Applicant Doesnt Exist");

  const { studentDetails } = _applicant;
  const { yearLevel: level, track } = studentDetails;

  // Filter Examiniees
  if (level === "Grade 7" || level === "Grade 11" || level === "Grade 12") {
    if (track === "SPE" || track === "SPJ" || track === "STEM") {
      const _examiniees = await applicantModel.findOneAndUpdate(
        { _id: UID },
        { status: "accepted", role: "examiniees" },
        { new: true }
      );
      if (!_examiniees)
        throw new Error("Something went wrong, Please Try again");

      res.status(200).json({
        payload: null,
        message: "Accepted Applicant",
      });

      return;
    }
  }

  // Regular student
  const regular = await applicantModel.findOneAndUpdate(
    { _id: UID },
    { status: "accepted", role: "regular" },
    { new: true }
  );
  if (!regular) throw new Error("Something went wrong");

  res.status(200).json({
    payload: null,
    message: "Applicant Accepted Successfully",
  });
});
