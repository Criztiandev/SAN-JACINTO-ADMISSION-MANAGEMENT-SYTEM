import express from "express";
import { loginController } from "../controller/autController.js";

const router = express.Router();

router.post("/login", loginController);
// router.post("/register", [validation, validateAdmin], registerFeature);

// router.post("/forgot-password", forgotPassFeature);
// router.get("/checkpoint/:id/:token", getResetToken);
// router.post("/checkpoint/verify", [protect], verifyResetToken);

export default router;
