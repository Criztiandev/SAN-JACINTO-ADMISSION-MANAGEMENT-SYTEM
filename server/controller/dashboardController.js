import asyncHandler from "express-async-handler";
import applicantModel from "../models/applicantModel.js";

export const fetchSchoolStats = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body) {
    throw new Error("Request Body Doesn't Exist");
  }

  // Assuming applicantModel is a Mongoose model
  const applicants = await applicantModel.find({}).lean();

  const juniorCount = applicants.filter((applicant) => {
    const current = applicant?.studentDetails?.yearLevel;
    return ["Grade 7", "Grade 8", "Grade 9", "Grade 10"].includes(current);
  }).length;
  const seniorCount = applicants.filter((applicant) => {
    const current = applicant?.studentDetails?.yearLevel;
    return ["Grade 11", "Grade 12"].includes(current);
  }).length;
  const totalApplicantsCount = applicants.length;

  const payload = [
    { title: "Junior", count: juniorCount, increase: 0 },
    { title: "Senior", count: seniorCount, increase: 0 },
    { title: "Total Applicants", count: totalApplicantsCount, increase: 0 },
  ];

  res.status(200).json({ payload });
});
