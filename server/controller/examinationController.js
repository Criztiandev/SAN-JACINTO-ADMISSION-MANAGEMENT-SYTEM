import asyncHandler from "express-async-handler";
import examinieesModel from "../models/examinieesModel.js";

export const fetchAllExaminiees = asyncHandler(async (req, res) => {
  const { filter } = req.query || {};

  const _examiniees = await examinieesModel.find(filter).lean();

  res.status(200).json({
    payload: _examiniees,
    message: "Fetch Successfully",
  });
});
