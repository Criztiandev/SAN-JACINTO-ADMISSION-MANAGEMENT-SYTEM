import express from "express";
import {
  createExaminiees,
  fetchAllExaminiees,
  fetchExaminieesById,
  promoteExaminiees,
} from "../controller/examinationController.js";
const router = express.Router();

router.post("/promote", promoteExaminiees);
router.get("/", fetchAllExaminiees);
router.get("/:id", fetchExaminieesById);

router.post("/create", createExaminiees);

export default router;
