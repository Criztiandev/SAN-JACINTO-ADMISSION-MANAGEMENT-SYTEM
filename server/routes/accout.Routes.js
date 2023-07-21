import express from "express";
import { loginUser, registerUser } from "../controller/auth.Controller.js";
import { requestBodyValidation } from "../middleware/validation.js";
const router = express.Router();

router.get("/profile", (req, res) => {});
router.put("/profile/update", (req, res) => {});
router.delete("/profile/delete", (req, res) => {});

export default router;
