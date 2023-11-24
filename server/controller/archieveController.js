import expressAsyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";
import { sendEmail } from "../utils/email.uitls.js";

export const deleteArchieve = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const _applicant = await applicantModel.findOne({ _id: id }).lean();
  if (!_applicant) throw new Error("Applicant Doesnt exist");

  const { personalDetails } = _applicant;
  const fulleName = `${personalDetails?.lastName}, ${personalDetails?.firstName} ${personalDetails?.middleName[0]}`;

  const sendNotice = await sendEmail({
    target: _applicant?.personalDetails?.email,
    title: "[SJNHS] Notice of Account Deletion ",
    body: `Dear ${fulleName},\n\nI hope this message finds you well. This is to inform you that your account with SAN JACINTO NATIONAL HIGHSCHOOL is scheduled for deletion due to either inactivity or invalid credentials associated with the account.\n\nOur records indicate that the account has been inactive for an extended period, and attempts to log in with the provided credentials have been unsuccessful. In light of this, we have initiated the account deletion process to maintain the security and integrity of our system.\n\nIf you believe that this action has been taken in error or if you have concerns regarding your account, we kindly request you to reach out to us through our official Facebook page. You can contact us by visiting the following link: https://web.facebook.com/profile.php?id=100057254777878.\n\nOur support team will be happy to assist you with any concerns or issues you may have. Please provide relevant details regarding your account, and we will investigate the matter promptly.\n\nWe value your understanding and cooperation in this matter. Thank you for your attention to this issue.\n\nBest regards,\nAdministration
      `,
  });

  if (!sendNotice)
    throw new Error("Something went wrong , Please Try again later");

  // delete the credentials

  res.status(200).json({
    payload: null,
    message: "Deleted Successfully",
  });
});
