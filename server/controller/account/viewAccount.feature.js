import asyncHandler from "express-async-handler";

const viewProfile = asyncHandler(async (req, res) => {
  const user = req.session.user;
  res.status(200).json(user);
});

export default viewProfile;
