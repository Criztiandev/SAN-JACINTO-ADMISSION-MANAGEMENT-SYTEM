import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import { checkUserExistance } from "../utils/validate.utils.js";

export const validateAdmin = asyncHandler(async (req, res, next) => {
  // check the route that come from
  const route = req.route.path;
  if (route === "/register") {
    const { email, contact } = req.body;

    const payload = await checkUserExistance({ email, contact }, adminModel, {
      exist: true,
    });

    if (typeof payload === "string" || payload === null) {
      res.status(400);
      throw new Error(payload === null ? "Invalid user data" : payload);
    }

    req.registration = { payload: req.body };
  }

  const UID = req.session.user;
  const user = await checkUserExistance({ _id: UID }, adminModel, {
    exist: true,
    data: true,
  });

  req.session = { ...req.session, user: user };
  next();
});
