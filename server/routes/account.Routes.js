import express from "express";
import {
  deleteProfile,
  logout,
  updateProfile,
  viewProfile,
} from "../controller/account.Controller.js";
import {
  protect,
  validateSession,
  validateUser,
  validation,
} from "../middleware/_index.js";
const router = express.Router();

router
  .route("/profile")
  .get([protect, validateSession, validateUser], viewProfile)
  .put([validation, protect, validateSession, validateUser], updateProfile)
  .delete([protect, validateSession, validateUser], deleteProfile);

router.post(
  "/profile/logout",
  [protect, validateSession, validateUser],
  logout
);

export default router;
