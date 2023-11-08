import express from "express";
import { fetchSchoolStats } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/stats", fetchSchoolStats);

export default router;
