import asyncHandler from "express-async-handler";

const createApplicant = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(req.body);
});

export default createApplicant;