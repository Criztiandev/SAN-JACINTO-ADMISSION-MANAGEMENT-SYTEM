import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  getResetToken,
} from "../controller/auth.Controller.js";
import { validation } from "../middleware/validation.js";
const router = express.Router();

router.post("/login", [validation], loginUser);
router.post("/register", [validation], registerUser);

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", getResetToken);

export default router;
