import asyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import { sendEmail } from "../utils/email.uitls.js";

export const createApplicant = asyncHandler(async (req, res) => {
  const { personalDetails } = req.body;
  const { email } = personalDetails;

  const fullName = `${personalDetails?.lastName}, ${personalDetails?.firstName} ${personalDetails?.middleName[0]} ${personalDetails?.suffix}`;

  console.log(personalDetails);

  // Check for existing records
  const fieldsToCheck = [
    "studentDetails.LRN",
    "studentDetails.PSA",
    "personalDetails.email",
    "personalDetails.contact",
  ];

  const existingApplicant = await applicantModel.findOne({
    $or: fieldsToCheck.map((field) => ({ [field]: req.body[field] })),
  });

  if (existingApplicant) {
    const duplicateField = fieldsToCheck.find(
      (field) => existingApplicant[field] === req.body[field]
    );
    console.log(
      `Error: The ${duplicateField} already exists for another applicant.`
    );
    return res.status(400).json({
      error: `The ${duplicateField} already exists for another applicant.`,
    });
  }

  // Create Applicant
  const newApplicant = await applicantModel.create(req.body);
  if (!newApplicant) {
    throw new Error("Server Error. Please Try again");
  }

  // Welcoming Email
  const currentEmail = await sendEmail({
    target: email,
    title: "Admission Confirmation",
    body: `Dear ${fullName}\n\nI trust this message finds you well. On behalf of the SJNHS Admission team, I extend our heartfelt appreciation for your application.\n\nWe have carefully reviewed your details, and we are pleased to inform you that your application has been accepted. Congratulations on your successful admission to [Your Program/Organization]!\n\nAs we move forward, we will keep you informed about any additional steps or updates regarding your schedule. Our aim is to ensure a smooth and seamless onboarding process for you.\n\nFeel free to reach out to us should you have any questions or require further information. We value open communication and are here to assist you in any way possible.\n\nOnce again, congratulations on this significant achievement, and we look forward to welcoming you to the SJNHS community.\n\nBest regards,\nAdmission\nSJNHS Team`,
  });

  if (!currentEmail) throw new Error("Something went wrong, Please Try again");
  res.status(201).json({ message: "Applicant created successfully" });
});

export const fetchAllApplicant = asyncHandler(async (req, res) => {
  const { status, role } = req.query;

  const fields =
    "_id studentDetails.LRN studentDetails.yearLevel studentDetails.track personalDetails guardianDetails.legalGuardian gradeDetails.generalAve status";

  const applicants = await applicantModel
    .find({ status: status || "pending", role: role || "applicant" })
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

export const updateApplicantByStatus = asyncHandler(async (req, res) => {
  const { _id, status } = req.body;

  const _applicant = await applicantModel.findById(_id).lean().select("_id");
  if (!_applicant) throw new Error("Applicant Doesnt exist");

  const _update = await applicantModel.findOneAndUpdate(
    { _id: _id },
    { status: status },
    { new: true }
  );
  if (!_update) throw new Error("Failed to update");

  res.status(200).json({
    payload: null,
    message: "Updated Successfully",
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
