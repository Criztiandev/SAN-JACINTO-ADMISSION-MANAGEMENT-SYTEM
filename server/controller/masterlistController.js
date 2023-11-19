import expressAsyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";

export const fetchMasterListByLevel = expressAsyncHandler(async (req, res) => {
  const { level } = req.query;

  const _applicants = await applicantModel
    .find({
      "studentDetails.yearLevel": `Grade ${level}`,
      role: "regular",
      status: "accepted",
    })
    .lean();

  res.status(200).json({
    payload: _applicants,
    message: "Null",
  });
});

export const fetchMasterListLevels = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    payload: [
      { title: "Grade 7", count: 50 },
      { title: "Grade 8", count: 10 },
      { title: "Grade 9", count: 10 },
      { title: "Grade 10", count: 90 },
      { title: "Grade 11", count: 10 },
      { title: "Grade 12", count: 10 },
    ],
  });
});
