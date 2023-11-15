import express from "express";
import {
  acceptApplicant,
  createApplicant,
  deleteApplicant,
  fetchAllApplicant,
  fetchAllExaminiesStudents,
  fetchAllRegularStudents,
  fetchApplicantByID,
  updateApplicant,
} from "../controller/applicantController.js";

const router = express.Router();

router.post("/create", createApplicant);
router.post("/accept/", acceptApplicant);

router.get("/", fetchAllApplicant);
router.get("/regular", fetchAllRegularStudents);
router.get("/examiniees", fetchAllExaminiesStudents);

router.get("/:id", fetchApplicantByID);
router.put("/:id", updateApplicant);
router.delete("/:id", deleteApplicant);
// get all applicants

export default router;
