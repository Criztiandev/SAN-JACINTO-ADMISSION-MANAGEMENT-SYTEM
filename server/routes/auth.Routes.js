import express from "express";
import { loginUser, registerUser } from "../controller/auth.Controller.js";
import { requestBodyValidation } from "../middleware/validation.js";
const router = express.Router();

router.post("/login", [requestBodyValidation], loginUser);
router.post("/register", [requestBodyValidation], registerUser);

export default router;
