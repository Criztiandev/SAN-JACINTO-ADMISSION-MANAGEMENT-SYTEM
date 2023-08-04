import express from "express";
import createSchedule from "../controller/schedule/create.schedule.feature.js";
import {
  protect,
  validateAdmin,
  validateSession,
} from "../middleware/_index.js";
const router = express.Router();

router.post(
  "/create",
  [protect, validateSession, validateAdmin],
  createSchedule
);

export default router;
