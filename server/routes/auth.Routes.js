import express from "express";
import {
  // forgotPassword,
  loginUser,
  registerUser,
  // getResetToken,
  // verifyResetToken,
} from "../controller/auth.Controller.js";
import { validation } from "../middleware/_index.js";
// import { protect } from "../middleware/protected.js";
const router = express.Router();

router.post("/login", [validation], loginUser);
router.post("/register", [validation], registerUser);

// router.post("/forgot-password", forgotPassword);
// router.get("/checkpoint/:id/:token", getResetToken);
// router.post("/checkpoint/verify", [protect], verifyResetToken);

export default router;
