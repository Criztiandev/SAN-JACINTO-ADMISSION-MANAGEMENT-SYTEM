import express from "express";
import {
  createExaminiees,
  fetchAllExaminiees,
  fetchExaminieesById,
  promoteExaminiees,
} from "../controller/examinationController.js";
import { BatchExaminieesPromote } from "../controller/examinieesController.js";
const router = express.Router();

router.post("/promote", promoteExaminiees);
router.get("/", fetchAllExaminiees);
router.get("/:id", fetchExaminieesById);

router.post("/batch/promote", BatchExaminieesPromote);
router.post("/create", createExaminiees);

export default router;
