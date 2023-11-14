import expressAsyncHandler from "express-async-handler";
import batchModel from "../models/batchModel.js";

export const fetchAllBatch = expressAsyncHandler(async (req, res) => {
  const batch = await batchModel.find({}).lean();

  res.status(200).json({
    payload: batch,
    message: "Fetch All Batch",
  });
});
