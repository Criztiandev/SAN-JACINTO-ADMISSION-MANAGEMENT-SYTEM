import asyncHandler from "express-async-handler";
import { deleteTokenFromCookies } from "../../utils/token.utils.js";
import sessionModel from "../../models/session.Model.js";
import accountModel from "../models/accountModel.js";

export const createAccount = asyncHandler(async (req, res) => {
  const { FBID } = req.body;

  if (FBID) throw new Error("Facebook ID already exist");

  const _account = await accountModel.create(req.body);
  if (!_account) throw new Error("Account Already Exist");

  res.status(200).json({
    message: "Account Created Successfully",
  });
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { payload } = req.body;

  const _account = await accountModel
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .lean()
    .select("_id");

  if (_account) throw new Error("Account already exist");
});

export const fetchAllAccount = asyncHandler(async (req, res) => {
  const _account = await accountModel.find({}).lean();

  res.status(200).json({
    payload: _account,
    message: " Account Created Successfully",
  });
});

export const fetchAccoutById = asyncHandler(async (req, res) => {
  const { id } = params.id;

  const _account = await accountModel
    .findById({ _id: id })
    .lean()
    .select("_id -userDetails.password");

  if (!_account) throw new Error("Account Doesnt Exist");

  res.status(200).json({
    payload: _account,
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const _account = await accountModel
    .findOneAndDelete({ _id: id })
    .lean()
    .select("_id");

  if (!_account) throw new Error("Account Doesnt Exist");

  res.status(200).json({
    id: _account._id,
  });
});

export const logoutAccount = asyncHandler(async (req, res) => {
  const SID = req.session.id;
  const UID = req.session.user._id;

  // delete session
  await sessionModel.deleteOne({ _id: SID });
  deleteTokenFromCookies(process.env.AUTH_NAME, res);

  // delete req.session;
  req.session = null;

  res.status(200).json({
    id: UID,
    message: "Logout User",
  });
});
