import express from "express";
import { validation } from "../middleware/validation.js";
import {
  deleteProfile,
  updateProfile,
  viewProfile,
} from "../controller/account.Controller.js";
import { protect } from "../middleware/protected.js";
const router = express.Router();

router
  .route("/profile")
  .get([protect], viewProfile)
  .put([validation, protect], updateProfile)
  .delete([validation, protect], deleteProfile);

export default router;
