import expressAsyncHandler from "express-async-handler";
import scheduleModel from "../models/scheduleModel.js";
import batchModel from "../models/batchModel.js";

export const fetchAllSchedule = expressAsyncHandler(async (req, res) => {
  const schedules = await scheduleModel
    .find({})
    .lean()
    .select("_id title schedule time");

  res.status(200).json({
    payload: schedules,
    message: "Fetched Successfully",
  });
});

export const fetchScheduleByID = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const _schedule = await scheduleModel.findById(id).lean();
  if (!_schedule) throw new Error("Schedule Doesnt Exist");

  const _batches = await Promise.all(
    _schedule.batches.map(async (id) => {
      return await batchModel.findOne({ _id: id });
    })
  );

  res.status(200).json({
    payload: {
      ..._schedule,
      batches: _batches,
    },
    message: `${_schedule?.title} Fetched Successfully`,
  });
});

export const updateScheduleById = expressAsyncHandler(async (req, res) => {
  const { id: SID } = req.params;
  const payload = req.body;

  const _schedule = await scheduleModel.findOneAndUpdate({ _id: SID }, payload);
  if (!_schedule) throw new Error("Something wen wrong, Please Try again");

  res.status(200).json({
    payload: { _id: _schedule._id },
    message: "Updated Successfully",
  });
});

export const createSchedule = expressAsyncHandler(async (req, res) => {
  const { title, facilitator, venue, batches } = req.body;

  if (batches.length <= 0) {
    throw new Error("Invalid, No Selected Batch, Please Try again");
  }

  // check title
  const _title = await scheduleModel
    .findOne({ title: title })
    .lean()
    .select("_id");
  if (_title) throw new Error("Title Already used, Please use other Title");

  // check facilitator
  const _facilitator = await scheduleModel
    .findOne({ facilitator: facilitator })
    .lean()
    .select("_id");
  if (_facilitator)
    throw new Error("Facilitator is already used, Please Try again");

  // check venue
  const _venue = await scheduleModel.findOne({ venue }).lean().select("_id");
  if (_venue)
    throw new Error("Venue is already used, Please Speacify another location");

  // create
  const create = await scheduleModel.create(req.body);
  if (!create) throw new Error("Something wen wrong");

  // update all batch
  await Promise.all(
    batches.map(async (id) => {
      await batchModel.findOneAndUpdate(
        { _id: id },
        { schedule: create._id, status: "ongoing" },
        { new: true }
      );
    })
  );

  res.status(200).json({
    payload: null,
    message: "Created Schedule Succesfully",
  });
});

export const deleteSchedule = expressAsyncHandler(async (req, res) => {
  const { id: APID } = req.params;

  const _schedle = await scheduleModel.findOne({ _id: APID }).lean();

  // update all the batches to pending
  await Promise.all(
    _schedle.batches.map(async (id) => {
      await batchModel.findOneAndUpdate(
        { _id: id },
        { schedule: null, status: "pending" },
        { new: true }
      );
    })
  );

  const schedule = await scheduleModel
    .findByIdAndDelete(APID)
    .lean()
    .select("_id");
  if (!schedule) throw new Error("Something went wrong");

  res.status(200).json({
    payload: null,
    message: "Delete Schedule Successfully",
  });
});
