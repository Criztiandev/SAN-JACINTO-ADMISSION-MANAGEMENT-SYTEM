import express from "express";
import { loginUser, registerUser } from "../controller/auth.Controller.js";
import { validation } from "../middleware/validation.js";
const router = express.Router();

router.post("/login", [validation], loginUser);
router.post("/register", [validation], registerUser);

export default router;
