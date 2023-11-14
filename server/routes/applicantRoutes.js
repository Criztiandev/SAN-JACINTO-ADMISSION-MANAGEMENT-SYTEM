import express from "express";
import {
  acceptApplicant,
  createApplicant,
  deleteApplicant,
  fetchAllApplicant,
  fetchApplicantByID,
  updateApplicant,
} from "../controller/applicantController.js";
import { fetchAllExaminiees } from "../controller/examinieesController.js";

const router = express.Router();

router.post("/create", createApplicant);
router.post("/accept", acceptApplicant);

router.get("/", fetchAllApplicant);
router.get("/:id", fetchApplicantByID);
router.put("/:id", updateApplicant);
router.delete("/:id", deleteApplicant);
// get all applicants

export default router;
