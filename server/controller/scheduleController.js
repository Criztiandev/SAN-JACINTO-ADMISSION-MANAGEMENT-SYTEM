import asyncHandler from "express-async-handler";
import scheduleModel from "../models/scheduleModel.js";
import applicantModel from "../models/applicantModel";

export const createSchedule = asyncHandler(async (req, res) => {
  const { title, type } = req.body;

  const _schedule = scheduleModel
    .findOne({
      $or: [{ title: title }, { type: type }],
    })
    .lean()
    .select("_id");

  if (_schedule) throw new Error("Schedule Already Exist");

  res
    .status(200)
    .json({ payload: _schedule, message: "Schedule Created Successfully" });
});

export const findAllSchedule = asyncHandler(async (req, res) => {
  const _schedule = await scheduleModel.find({}).lean();
  res.status(200).json({ payload: _schedule });
});

export const findScheduleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const _schedule = await scheduleModel.findById(id);
  if (!_schedule) throw new Error("Schedule Doest Exist");

  res.status(200).json({ payload: _schedule, message: "Schedule found" });
});

export const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { payload } = req.body;

  const _schedule = await scheduleModel
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .lean()
    .select("_id");

  if (!_schedule) throw new Error("Updating Credentails Failed");

  res
    .status(200)
    .json({ payload: _schedule._id, message: "Updated Successfully" });
});

export const deleteSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const _schedule = await applicantModel.findOneAndDelete({ _id: id });

  if (!_schedule) throw new Error("Schedule Doesnt Exist");
});
