import express from "express";

import { protect, validateAdmin, validation } from "../middleware/_index.js";
import {
  forgotPassFeature,
  getResetToken,
  loginFeature,
  registerFeature,
  verifyResetToken,
} from "../controller/auth/_index.js";
const router = express.Router();

router.post("/login", [validation], loginFeature);
router.post("/register", [validation, validateAdmin], registerFeature);

router.post("/forgot-password", forgotPassFeature);
router.get("/checkpoint/:id/:token", getResetToken);
router.post("/checkpoint/verify", [protect], verifyResetToken);

export default router;
