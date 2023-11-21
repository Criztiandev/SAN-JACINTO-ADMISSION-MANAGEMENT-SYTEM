import express from "express";
import {
  deleteSessionById,
  getSessionByID,
  loginUserController,
  verifyUserController,
} from "../controller/authController.js";

const router = express.Router();

router.post("/login", loginUserController);
router.post("/verify", verifyUserController);
router.get("/session/:id", getSessionByID);

router.delete("/session/:id", deleteSessionById);

// router.post("/register", [validation, validateAdmin], registerFeature);

// router.post("/forgot-password", forgotPassFeature);
// router.get("/checkpoint/:id/:token", getResetToken);
// router.post("/checkpoint/verify", [protect], verifyResetToken);

export default router;
