import express from "express";
import { fetchAllExaminiees } from "../controller/examinationController.js";
const router = express.Router();

router.get("/", fetchAllExaminiees);

export default router;
