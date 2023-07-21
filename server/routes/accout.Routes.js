import express from "express";
import { requestBodyValidation } from "../middleware/validation.js";
import { viewProfile } from "../controller/account.Controller.js";
const router = express.Router();

router.get("/profile", viewProfile);
router.put("/profile/update", (req, res) => {});
router.delete("/profile/delete", (req, res) => {});

export default router;
