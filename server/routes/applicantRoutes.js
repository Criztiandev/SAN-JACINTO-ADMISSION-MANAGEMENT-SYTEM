import express from "express";
import {
  createApplicant,
  deleteApplicant,
  fetchAllApplicant,
  fetchAllRegularStudents,
  fetchApplicantByID,
  updateApplicant,
} from "../controller/applicantController.js";

const router = express.Router();

router.post("/create", createApplicant);

router.get("/", fetchAllApplicant);
router.get("/regular", fetchAllRegularStudents);

router.get("/:id", fetchApplicantByID);
router.put("/:id", updateApplicant);
router.delete("/:id", deleteApplicant);
// get all applicants

export default router;
