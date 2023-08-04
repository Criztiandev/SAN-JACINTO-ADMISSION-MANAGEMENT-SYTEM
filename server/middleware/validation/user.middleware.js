import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";

export const validateAdmin = asyncHandler(async (req, res, next) => {
  const route = req.route.path;

  switch (route) {
    // handle registration valdation
    case "/register":
      const { email, contact } = req.body;

      await adminModel.findUser({ email, contact });

      req.registration = { payload: req.body };
      req.body = null;
      next();
      break;

    default:
      const UID = req.session.user;
      const user = await adminModel.findUser({ _id: UID }, { exist: true });
      req.session = { ...req.session, user: user };
      next();
      break;
  }
});
