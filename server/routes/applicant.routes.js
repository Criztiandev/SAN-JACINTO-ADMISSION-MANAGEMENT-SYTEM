import express from "express";
import createApplicant from "../controller/applicants/create.applicant.feature.js";
const router = express.Router();

router.post("/create", createApplicant);

// get all applicants

export default router;
