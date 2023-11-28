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
  const { applicants, title, message } = req.body;

  // get the emails of applicants
  const emails = applicants?.map((applicant) => {
    return applicant?.personalDetails?.email; // fix variable name here
  });

  const APIDS = applicants?.map((field) => field?._id);

  const _examinees = await examiniationModel
    .find({ APID: { $in: APIDS } })
    .lean()
    .select("schedule track permitID fullName");

  console.log(_examinees);

  // // send email message per applicant
  const emailPromises = _examinees.map(async (examinee, index) => {
    const { fullName, schedule, permitID, track } = examinee;
    const template = generateMessage(
      fullName,
      schedule,
      permitID,
      track,
      message
    );

    await sendEmail({
      target: emails[index],
      title: title,
      body: template,
    });
  });

  await Promise.all(emailPromises);

  if (!emailPromises) throw new Error("Something went wrong, Please Try again");

  res.status(200).json({
    payload: null,
    message: "Announced Successfully",
  });
});

const generateMessage = (fullName, schedule, permit, track, message) => {
  return `
  Dear ${fullName},\n
  We hope this message finds you well. This is to inform you that your examination schedule has been finalized, and we are excited to confirm your participation in the upcoming examination.
  
  [❗ DETAILS]
  📅 Schedule: ${schedule}
  📜 Permit ID: ${permit}
  🎒 Track: ${track}

  To ensure a smooth examination process, we kindly request you to submit the following documents at your earliest convenience:

  ${message}

  Please ensure that the documents are submitted in a timely manner to avoid any complications on the day of the examination. If you encounter any challenges or have questions, feel free to reach out to our Facebook Page: https://web.facebook.com/profile.php?id=100057254777878.

  We appreciate your cooperation and wish you the best of luck in your upcoming examination.
  
  Best regards,
  Administration
  `;
};
