import expressAsyncHandler from "express-async-handler";
import scheduleModel from "../models/scheduleModel.js";
import batchModel from "../models/batchModel.js";
import examiniationModel from "../models/examiniationModel.js";
import dayjs from "dayjs";
import applicantModel from "../models/applicantModel.js";

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
  const updatedBatches = await Promise.all(
    batches.map(async (id) => {
      const updatedBatch = await batchModel
        .findByIdAndUpdate(
          { _id: id },
          { schedule: create._id, status: "ongoing" },
          { new: true }
        )
        .lean()
        .select("selected");

      return updatedBatch.selected;
    })
  );

  // update the applicant by schedule and status
  updatedBatches.map(async (examinees) => {
    await Promise.all(
      examinees.map(async (ids) => {
        const { start, end } = create?.schedule || {};
        // check if the selected is examinnies
        const _data = await applicantModel
          .findOne({ _id: ids.toString() })
          .lean()
          .select("role");

        if (_data.role === "examiniees") {
          await examiniationModel.findOneAndUpdate(
            { APID: ids.toString() },
            {
              schedule: formatDate(dayjs(start), dayjs(end)),
              status: "scheduled",
            },
            { new: true }
          );

          return;
        }

        await applicantModel.findOneAndUpdate(
          { _id: ids.toString() },
          { status: "scheduled" },
          { new: true }
        );

        return;
      })
    );
  });

  res.status(200).json({
    payload: null,
    message: "Created Schedule Succesfully",
  });
});

export const deleteSchedule = expressAsyncHandler(async (req, res) => {
  const { id: APID } = req.params;
  const query = { schedule: null, status: "pending" };

  const _schedule = await scheduleModel.findOne({ _id: APID }).lean();

  const { batches } = _schedule;
  // update all the batches to pending
  const updatedBatches = await Promise.all(
    batches?.map(async (id) => {
      const updatedBatch = await batchModel
        .findOneAndUpdate({ _id: id }, query, { new: true })
        .lean()
        .select("selected");

      return updatedBatch.selected;
    })
  );

  // update all the examiniees

  updatedBatches.map(async (examinees) => {
    await Promise.all(
      examinees.map(async (ids) => {
        const _data = await applicantModel
          .findOne({ _id: ids.toString() })
          .lean()
          .select("role");

        if (_data.role === "examiniees") {
          await examiniationModel.findOneAndUpdate(
            { APID: ids.toString() },
            query,
            { new: true }
          );

          return;
        }

        await applicantModel.findOneAndUpdate(
          { _id: ids.toString() },
          { status: "accepted" },
          { new: true }
        );

        return;
      })
    );
  });

  //delete
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

export const deleteScheduleByForce = expressAsyncHandler(async (req, res) => {
  const { id: APID } = req.params;

  const _schedule = await scheduleModel.findOne({ _id: APID }).lean();
  if (!_schedule) throw new Error("Applicant Doesnt exist");

  //delete
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

export const finishSchedule = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const _schedule = await scheduleModel
    .findById(id)
    .lean()
    .select("batches status");
  if (!_schedule) throw new Error("Schedule doesnt exist");

  const { batches } = _schedule;

  const updatedBatches = await Promise.all(
    batches.map(async (id) => {
      const updatedBatch = await batchModel
        .findOneAndDelete({ _id: id })
        .lean()
        .select("selected");

      return updatedBatch;
    })
  );

  await Promise.all(
    updatedBatches.map(async (props) => {
      const { selected } = props;

      await Promise.all(
        selected.map(async (id) => {
          const _data = await applicantModel
            .findOne({ _id: id.toString() })
            .lean()
            .select("role");

          if (_data?.role === "examiniees") {
            console.log("Applicant");
            await examiniationModel.findOneAndUpdate(
              { APID: id.toString() },
              {
                schedule: "Done",
                status: "finished",
              },
              { new: true }
            );

            return;
          }

          if (_data?.role === "transferee") {
            await applicantModel.findOneAndUpdate(
              { _id: id.toString() },
              { status: "done" },
              { new: true }
            );
            return;
          }

          await applicantModel.findOneAndUpdate(
            { _id: id.toString() },
            { status: "done" },
            { new: true }
          );
          return;
        })
      );
    })
  );

  res.status(200).json({
    payload: null,
    message: "Finished Schedule",
  });
});

// Utils

const formatDate = (start, end) => {
  // Format the start and end dates
  const currentYear = new Date().getFullYear();
  const formattedStartDate = start?.format("MMM, D");
  const formattedEndDate = end?.format("MMM, D");

  // Combine formatted start and end dates
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}, ${currentYear}`;
  return formattedDateRange;
};
