import asyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import accountModel from "../models/accountModel.js";
import mongoose from "mongoose";
import { examinationSchedModel } from "../models/scheduleModel.js";

export const createApplicant = asyncHandler(async (req, res) => {
  const { studentDetails, personalDetails, socials } = req.body;
  const { LRN, PSA, track, yearLevel } = studentDetails;
  const { gmail, facebook } = socials;

  // convert user word to obfuscate
  const user = process.env.USER_ROLE;
  const availableSched = "64fca672739faa677ae59f42";

  // dehash the LRN and PSA and hash it again when being outputed in the FE

  // check if user exist
  const _exist = await applicantModel.findOne({
    $or: [{ "studentDetails.LRN": LRN }, { "studentDetails.PSA": PSA }],
  });
  if (_exist) throw new Error("Applicant Already Exist");

  // check if the user social is already exist
  const _socials = await applicantModel.findOne({
    $or: [{ "social.gmail": gmail }, { "social.facebook.id": facebook?.id }],
  });

  if (_socials) throw new Error("Social Account already exist");

  // create applicant
  const _applicant = await applicantModel.create(req.body);
  if (!_applicant) throw new Error("Creating Applicant Failed");

  // check if year level
  if ((yearLevel === "grade 7" && track === "SPE") || track === "SPJ") {
    const _schedule = await examinationSchedModel.findOneAndUpdate(
      { _id: availableSched },
      { $addToSet: { applicants: _applicant._id } },
      { new: true }
    );

    if (!_schedule) throw new Error("Creating Schedule Failed");
  }

  // create a account
  const _account = await accountModel.create({
    APID: _applicant._id,
    FBID: facebook?.id,

    userDetails: {
      username: "Criztiandev",
      gmail: gmail,
      password: null,
      permission: user,
    },

    personalDetails,
    createdBy: _applicant._id,
  });

  if (!_account)
    throw new Error(
      "Account Creation Failed, There must be something wrong, kasalanan to ni Kaizer"
    );

  // send facebook message

  res.status(200).json({
    message: "User Created Successfully",
  });
});

export const fetchAllApplicant = asyncHandler(async (req, res) => {
  const _applicant = await applicantModel.find({}).lean();

  if (_applicant.length <= 0) {
    res.status(200).json({ payload: null, message: "Empty Applicants" });
  }

  res.status(200).json({
    payload: _applicant,
    message: "Fetched All Applicante",
  });
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
