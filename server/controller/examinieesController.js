import expressAsyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import examiniationModel from "../models/examiniationModel.js";
import { sendEmail } from "../utils/email.uitls.js";

export const fetchAllExaminiees = expressAsyncHandler(async (req, res) => {
  const _examinees = await applicantModel.find({ role: "examiniees" });

  res.status(200).json({
    payload: _examinees,
    message: "Fetched Successfully",
  });
});

export const BatchExaminieesPromote = expressAsyncHandler(async (req, res) => {
  const { title, message, selected, track: mainTrack } = req.body;

  if (!title) {
    throw new Error("No Title Specified");
  }

  if (!message) {
    throw new Error("Message is not Specified");
  }

  if (!mainTrack) {
    throw new Error("Invalid Track");
  }

  if (!selected || selected?.length <= 0) {
    throw new Error("Please Select a Examinees");
  }

  // Get all examinees' IDs from the examinationModel
  const _examineesID = await examiniationModel
    .find({ _id: { $in: selected } })
    .lean()
    .select("APID");

  // Check if any examinees were found
  if (!_examineesID || _examineesID.length === 0) {
    throw new Error("No matching examinees found");
  }

  // Get details about their applicant credentials
  const _applicants = await applicantModel
    .find({
      _id: { $in: _examineesID.map((item) => item.APID) },
    })
    .lean()
    .select(
      "_id personalDetails.lastName personalDetails.firstName  personalDetails.middleName  personalDetails.suffix personalDetails.email"
    );

  // Check if any applicants were found
  if (!_applicants || _applicants.length === 0) {
    throw new Error("No matching applicants found");
  }

  const emailPromises = _applicants.map(async (applicant, index) => {
    const { firstName, middleName, lastName, suffix, email } =
      applicant?.personalDetails;
    const fullName = `${lastName} ${firstName} ${middleName && middleName[0]} ${
      suffix && suffix
    }`;

    await sendEmail({
      target: email,
      title: title,
      body: `Dear ${fullName},\n\n ${message}`,
    });
  });

  await Promise.all(emailPromises);
  if (!emailPromises) throw new Error("Something went wrong, Please Try again");

  const updatePromises = _applicants.map(async (applicant) => {
    await applicantModel.findByIdAndUpdate(
      applicant._id,
      {
        $set: {
          role: "regular",
          status: "done",
          "studentDetails.track": mainTrack,
        },
      },
      { new: true } // To get the updated document
    );
  });

  await Promise.all(updatePromises);
  if (!updatePromises)
    throw new Error("Something went wrong during updates, Please try again");

  const deleteResult = await examiniationModel.deleteMany({
    _id: { $in: selected },
  });

  if (deleteResult.deletedCount === 0) {
    throw new Error("No matching applicants found to delete");
  }

  res.status(200).json({
    payload: null,
  });
});
