import express from "express";
import { fetchAllSchedule } from "../controller/scheduleController.js";
const router = express.Router();

router.get("/", fetchAllSchedule);

export default router;
