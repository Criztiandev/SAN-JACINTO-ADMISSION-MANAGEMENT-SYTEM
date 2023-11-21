import express from "express";
import {
  createSchedule,
  deleteSchedule,
  deleteScheduleByForce,
  fetchAllSchedule,
  fetchScheduleByID,
  finishSchedule,
  updateScheduleById,
} from "../controller/scheduleController.js";
const router = express.Router();

router.get("/", fetchAllSchedule);
router.post("/create", createSchedule);
router.post("/finish/:id", finishSchedule);
router.get("/:id", fetchScheduleByID);
router.put("/:id", updateScheduleById);

router.delete("/force/:id", deleteScheduleByForce);
router.delete("/:id", deleteSchedule);

export default router;
