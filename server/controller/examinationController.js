import asyncHandler from "express-async-handler";
import examinieesModel from "../models/examiniationModel.js";
import applicantModel from "../models/applicantModel.js";
import dayjs from "dayjs";

export const fetchAllExaminiees = asyncHandler(async (req, res) => {
  const { filter } = req.query;

  const _examiniees = await examinieesModel.find(filter).lean();

  res.status(200).json({
    payload: _examiniees,
    message: "Fetch Successfully",
  });
});

export const fetchExaminieesById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // check if applicant exist

  const _result = await examinieesModel.findOne({ _id: id }).lean();
  if (!_result) throw new Error("Examiniees doest exist");

  res.status(200).json({
    payload: _result,
    message: "Fetched Applicant",
  });
});

export const promoteExaminiees = asyncHandler(async (req, res) => {
  const { _id, APID, score, status } = req.body;

  const _applicant = await applicantModel.findById(APID).lean().select("_id");
  if (!_applicant) throw new Error("Applicant doesnt exist");

  // message

  await applicantModel.findOneAndUpdate(
    { _id: APID },
    { role: "regular", status: "accepted" },
    { new: true }
  );

  await examinieesModel.findOneAndDelete({ _id: _id }).lean().select("_id");

  res.status(200).json({
    payload: null,
    message: "Promoted Successfully",
  });
});

export const createExaminiees = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  // find the applicant
  const _applicant = await applicantModel
    .findById(_id)
    .lean()
    .select(" _id studentDetails.yearLevel studentDetails.track role status");
  if (!_applicant) throw new Error("Applicant Doesnt Exist");

  const { yearLevel: level, track } = _applicant?.studentDetails;

  const prefrredLevels = ["Grade 7", "Grade 11", "Grade 12"].includes(level);
  const prefrredTrack = ["SPE", "SPJ", "STEM"].includes(track);

  // Filter Examiniees
  if (prefrredLevels && prefrredTrack) {
    await acceptAsApplicant(_id, res);
    return;
  }

  // Regular student
  const regular = await applicantModel.findByIdAndUpdate(
    _id,
    { status: "accepted", role: "regular" },
    { new: true }
  );
  if (!regular) throw new Error("Something went wrong");

  res.status(200).json({
    payload: null,
    message: "Applicant Accepted Successfully",
  });
});

const acceptAsApplicant = async (UID, res) => {
  const query = { status: "accepted", role: "examiniees" };

  // Update the Applicant
  const _accepted = await applicantModel
    .findByIdAndUpdate(UID, query, { new: true })
    .lean()
    .select("_id personalDetails studentDetails.LRN studentDetails.track");

  if (!_accepted) throw new Error("Something went wrong, Please Try again");

  const { lastName, firstName, middleName, suffix, email, contact } =
    _accepted?.personalDetails;
  const { LRN } = _accepted?.studentDetails;

  // generate permit
  const currentDate = dayjs();
  const formatedDate = currentDate.format("DD/MM/YY").split("/").join("");
  const permit = `${LRN.substring(0, 6)}-${formatedDate}-${
    _accepted?.studentDetails?.track
  }`;

  const _examiniees = await examinieesModel.create({
    APID: UID,
    permitID: permit,
    fullName: `${lastName}, ${firstName} ${middleName[0]} ${suffix}`,
    email,
    contact,
    track: _accepted?.studentDetails?.track,
  });

  if (!_examiniees) throw new Error("Something went wrong,Please Try again");

  res.status(200).json({
    payload: null,
    message: "Accepted Applicant 123123",
  });
};
