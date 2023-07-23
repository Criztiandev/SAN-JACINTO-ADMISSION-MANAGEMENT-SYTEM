import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  getResetToken,
  verifyResetToken,
} from "../controller/auth.Controller.js";
import { validation } from "../middleware/validation.js";
import { resetProt } from "../middleware/protected.js";
const router = express.Router();

router.post("/login", [validation], loginUser);
router.post("/register", [validation], registerUser);

router.post("/forgot-password", forgotPassword);
router.get("/checkpoint/:id/:token", getResetToken);
router.post("/checkpoint/verify", [resetProt], verifyResetToken);

export default router;
