import express from "express";
import { requestBodyValidation } from "../middleware/validation.js";
import { viewProfile } from "../controller/account.Controller.js";
import { protectedRoute } from "../middleware/protected.js";
const router = express.Router();

router.get("/profile", [protectedRoute], viewProfile);
router.put(
  "/profile/update",
  [requestBodyValidation, protectedRoute],
  (req, res) => {}
);
router.delete(
  "/profile/delete",
  [requestBodyValidation, protectedRoute],
  (req, res) => {}
);

export default router;
