import express from "express";
import {
  fetchMasterListLevels,
  fetchMasterListByLevel,
  fetchSF1List,
  fetchApplicationForm,
} from "../controller/masterlistController.js";

const router = express.Router();

router.get("/", fetchMasterListByLevel);
router.get("/stats", fetchMasterListLevels);
router.get("/SF1", fetchSF1List);
router.get("/FORM", fetchApplicationForm);
export default router;
