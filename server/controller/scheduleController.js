import expressAsyncHandler from "express-async-handler";
import scheduleModel from "../models/scheduleModel.js";

export const fetchAllSchedule = expressAsyncHandler(async (req, res) => {
  const schedules = await scheduleModel.find({}).lean();

  res.status(200).json({
    payload: schedules,
    message: "Fetched Successfully",
  });
});
