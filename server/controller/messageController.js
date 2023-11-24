import expressAsyncHandler from "express-async-handler";
import { sendEmail } from "../utils/email.uitls.js";
import examiniationModel from "../models/examiniationModel.js";

export const messageApplicant = expressAsyncHandler(async (req, res) => {
  const { title, message, email } = req.body;

  const currentEmail = await sendEmail({
    target: email,
    title: title,
    body: message,
  });

  if (!currentEmail) throw new Error("Something went wrong, Please Try again");

  res.status(200).json({
    payload: null,
    message: "Messaged Successfully",
  });
});

export const annoucementBatch = expressAsyncHandler(async (req, res) => {
  const { applicants, title, message, examiniees } = req.body;

  // get the emails of applicants
  const emails = applicants?.map((applicant) => {
    return applicant?.personalDetails?.email; // fix variable name here
  });

  const APIDS = applicants?.map((field) => field?._id);

  const _examiniees = await examiniationModel
    .find({ APID: { $in: APIDS } })
    .lean()
    .select("schedule track permitID fullName");

  console.log(_examiniees);

  // // send email message per applicant
  const emailPromises = emails.map((email, index) => {
    const { fullName, schedule, permitID, track } = _examiniees[index];
    const template = generateMessage(
      fullName,
      schedule,
      permitID,
      track,
      message
    );

    sendEmail({
      target: email,
      title: title,
      body: template,
    });
  });

  const results = await Promise.all(emailPromises);

  // Check if all emails were sent successfully
  const allEmailsSent = results.every((result) => result);

  if (!allEmailsSent) {
    throw new Error("Something went wrong. Please try again.");
  }

  res.status(200).json({
    payload: null,
    message: "Annouced Successfully",
  });
});

const generateMessage = (fullName, schedule, permit, track, message) => {
  return `
  Dear ${fullName},
  We hope this message finds you well. This is to inform you that your examination schedule has been finalized, and we are excited to confirm your participation in the upcoming examination.
  
  To ensure a smooth examination process, we kindly request you to submit the following documents at your earliest convenience:

  📅 Schedule: ${schedule}
  📜 Permit ID: ${permit}
  🎒 Track: ${track}

  ${message}

  Please ensure that the documents are submitted in a timely manner to avoid any complications on the day of the examination. If you encounter any challenges or have questions, feel free to reach out to our Facebook Page: https://web.facebook.com/profile.php?id=100057254777878.

  We appreciate your cooperation and wish you the best of luck in your upcoming examination.
  
  Best regards,
  Administration
  `;
};
