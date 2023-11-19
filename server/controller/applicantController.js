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
    .find({ status: "pending", role: "applicant" })
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

export const fetchAllRegularStudents = asyncHandler(async (req, res) => {
  const _regular = await applicantModel.find({ role: "regular" }).lean();

  res.status(200).json({
    payload: _regular,
    message: "Fetched All regulars",
  });
});

export const fetchAllExaminiesStudents = asyncHandler(async (req, res) => {
  const _examiniees = await applicantModel.find({ role: "examiniees" }).lean();

  res.status(200).json({
    payload: _examiniees,
    message: "Fetched All regulars",
  });
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
