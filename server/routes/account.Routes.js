import express from "express";
import { validation } from "../middleware/validation.js";
import {
  deleteProfile,
  logout,
  updateProfile,
  viewProfile,
} from "../controller/account.Controller.js";
import { protect } from "../middleware/protected.js";
const router = express.Router();

router
  .route("/profile")
  .get([protect], viewProfile)
  .put([validation, protect], updateProfile)
  .delete([protect], deleteProfile);

router.post("/profile/logout", [protect], logout);

export default router;
