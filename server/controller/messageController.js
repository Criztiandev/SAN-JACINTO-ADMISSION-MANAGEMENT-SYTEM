import expressAsyncHandler from "express-async-handler";
import { sendEmail } from "../utils/email.uitls.js";

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

  // // send email message per applicant
  // const emailPromises = emails.map((email) =>
  //   sendEmail({
  //     target: email,
  //     title: title,
  //     body: message,
  //   })
  // );

  // const results = await Promise.all(emailPromises);

  // // Check if all emails were sent successfully
  // const allEmailsSent = results.every((result) => result);

  // if (!allEmailsSent) {
  //   throw new Error("Something went wrong. Please try again.");
  // }

  res.status(200).json({
    payload: null,
    message: "Annouced Successfully",
  });
});
