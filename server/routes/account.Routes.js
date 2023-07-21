import express from "express";
import { validation } from "../middleware/validation.js";
import { viewProfile } from "../controller/account.Controller.js";
import { protect } from "../middleware/protected.js";
const router = express.Router();

router.get("/profile", [protect], viewProfile);
router.put("/profile/update", [validation, protect], (req, res) => {});
router.delete("/profile/delete", [validation, protect], (req, res) => {});

export default router;
