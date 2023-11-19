import expressAsyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";

export const fetchAllExaminiees = expressAsyncHandler(async (req, res) => {
  const _examinees = await applicantModel.find({ role: "examiniees" });

  res.status(200).json({
    payload: _examinees,
    message: "Fetched Successfully",
  });
});
