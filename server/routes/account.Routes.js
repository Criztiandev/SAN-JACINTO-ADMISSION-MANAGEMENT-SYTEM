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
  validateAdmin,
  validation,
} from "../middleware/_index.js";
const router = express.Router();

router
  .route("/profile")
  .get([protect, validateSession, validateAdmin], viewProfile)
  .put([validation, protect, validateSession, validateAdmin], updateProfile)
  .delete([protect, validateSession, validateAdmin], deleteProfile);

router.post(
  "/profile/logout",
  [protect, validateSession, validateAdmin],
  logout
);

export default router;
