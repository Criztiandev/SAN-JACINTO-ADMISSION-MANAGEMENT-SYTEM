import asyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import { sendEmail } from "../utils/email.uitls.js";

const findApplicantByField = async (key, target) => {
  const query = { [key]: target };
  const existCredentials = await applicantModel
    .findOne(query)
    .lean()
    .select("_id");

  console.log(existCredentials);

  if (existCredentials) {
    throw new Error(
      `Applicant with ${key.split(".")[1] || key} '${target}' already exist`
    );
  }
};

export const createApplicant = asyncHandler(async (req, res) => {
  try {
    const { studentDetails, personalDetails } = req.body;
    const { LRN, PSA } = studentDetails;
    const { email, contact } = personalDetails;

    // Check for existing records
    await findApplicantByField("studentDetails.LRN", LRN);
    await findApplicantByField("studentDetails.PSA", PSA);
    await findApplicantByField("personalDetails.email", email);
    await findApplicantByField("personalDetails.contact", contact);

    const newApplicant = await applicantModel.create(req.body);

    if (newApplicant) {
      sendEmail({
        target: email,
        title: "Application Form Confirmation",
        body: "Hi Im Criztan This is the Test Email my Friend",
      });
      res.status(201).json({ message: "Applicant created successfully" });
    } else {
      throw new Error("Server error. Please try again.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const fetchAllApplicant = asyncHandler(async (req, res) => {
  try {
    const applicants = await applicantModel.find({}).lean();

    if (applicants.length === 0) {
      res.status(200).json({ payload: null, message: "No applicants found" });
    } else {
      res
        .status(200)
        .json({ payload: applicants, message: "Fetched all applicants" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const fetchApplicantByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const _applicant = await applicantModel.findById(id).lean();
  if (!_applicant) throw new Error("Applicant Not Found");

  res
    .status(200)
    .json({ payload: _applicant, message: "Applicant Fetch Successfully" });
});

export const updateApplicant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { credentails } = req.body;

  console.log(id);
  console.log(req.body);

  const _applicant = await applicantModel
    .findOneAndUpdate({ _id: id }, credentails, { new: true })
    .lean()
    .select("_id");

  if (!_applicant) throw new Error("Applicant Doest Found, Please Try Again");

  res.status(200).json({
    payload: _applicant._id,
    message: "Updated Credentials Successfully",
  });
});

export const deleteApplicant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const _applicant = await applicantModel
    .findOneAndDelete({ _id: id })
    .lean()
    .select("_id");

  if (!_applicant) throw new Error("Applicant Doesnt Found, Please Try again");

  res.status(200).json({
    payload: _applicant._id,
    message: "Applicant is Deleted Successfully",
  });
});
