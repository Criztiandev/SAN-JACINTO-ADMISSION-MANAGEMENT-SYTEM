import expressAsyncHandler from "express-async-handler";
import batchModel from "../models/batchModel.js";
import applicantModel from "../models/applicantModel.js";

export const fetchAllBatch = expressAsyncHandler(async (req, res) => {
  const batch = await batchModel.find({}).lean();

  res.status(200).json({
    payload: batch,
    message: "Fetch All Batch",
  });
});

export const fetchAllBatchExaminies = expressAsyncHandler(async (req, res) => {
  const _examiniess = await applicantModel
    .find({ role: "examiniees", status: "accepted" })
    .lean();

  res.status(200).json({
    payload: _examiniess,
    message: "Fetched All Examiniees",
  });
});

export const fetchBatchById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const _batch = await batchModel.findOne({ _id: id }).lean();
  if (!_batch) throw new Error("Batch not found");

  // get all the data of the examiniees
  const examinieesDetails = await Promise.all(
    (_batch.examiniees || []).map(async (examineeId) => {
      const examineeDetails = await applicantModel
        .findOne({ _id: examineeId })
        .lean()
        .select(
          "_id personalDetails.lastName personalDetails.firstName personalDetails.middleName studentDetails.track studentDetails.yearLevel gradeDetails.generalAve"
        );
      return examineeDetails;
    })
  );

  res.status(200).json({
    payload: { ..._batch, examiniees: examinieesDetails },
    message: "Fetch Batch items",
  });
});

export const createBatch = expressAsyncHandler(async (req, res) => {
  try {
    const { title, examiniees } = req.body;

    // Check if title already used
    const existingTitleBatch = await batchModel
      .findOne({ title })
      .lean()
      .select("_id");
    if (existingTitleBatch) {
      throw new Error("Batch Title Already used, Please try again");
    }

    // Check if any examiniee already exists in another batch
    const existingExaminees = await batchModel
      .find({ examiniees: { $in: examiniees } })
      .lean()
      .select("_id");

    if (existingExaminees.length > 0) {
      throw new Error("One of the Examinees already exists, Please try again");
    }

    // Create batch
    const newBatch = await batchModel.create({ title, examiniees });
    if (!newBatch) {
      throw new Error(
        "Something went wrong while creating the batch, please try again"
      );
    }

    // Update the status of examinees to 'scheduled'
    await Promise.all(
      examiniees.map(async (id) => {
        await applicantModel.findOneAndUpdate(
          { _id: id },
          { status: "scheduled" },
          { new: true }
        );
      })
    );

    res.status(200).json({
      payload: null,
      message: "Created Batch",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create batch",
    });
  }
});

export const deleteBatch = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const _batch = await batchModel.findById(id).lean().select("examiniees");
  if (!_batch) throw new Error("Batch doesnt exist");

  // update to examiniees
  await Promise.all(
    _batch.examiniees.map(async (id) => {
      await applicantModel.findOneAndUpdate(
        { _id: id },
        { status: "accepted" },
        { new: true }
      );
    })
  );

  const batchDelete = await batchModel
    .findOneAndDelete({ _id: id })
    .lean()
    .select("_id");
  if (!batchDelete) throw new Error("Something went wrong ,please try again");

  res.status(200).json({
    payload: null,
    message: "Deleted Successfully",
  });
});
