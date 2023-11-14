import express from "express";
import {
  createSchedule,
  deleteSchedule,
  fetchAllSchedule,
  fetchScheduleByID,
  updateScheduleById,
} from "../controller/scheduleController.js";
const router = express.Router();

router.get("/", fetchAllSchedule);
router.post("/create", createSchedule);
router.get("/:id", fetchScheduleByID);
router.put("/:id", updateScheduleById);
router.delete("/:id", deleteSchedule);
export default router;
