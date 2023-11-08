import asyncHandler from "express-async-handler";

export const fetchSchoolStats = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body) {
    throw new Error("Request Body Doesnt Exist");
  }

  res.status(200).json({
    payload: [
      { title: "Junior", count: 800, increase: 25 },
      { title: "Senior", count: 700, increase: 4 },
      { title: "Total Applicants", count: 1500, increase: 0 },
    ],
  });
});
