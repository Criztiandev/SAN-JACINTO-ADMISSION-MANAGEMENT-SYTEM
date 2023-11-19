import express from "express";
import {
  fetchMasterListLevels,
  fetchMasterListByLevel,
} from "../controller/masterlistController.js";

const router = express.Router();

router.get("/", fetchMasterListByLevel);
router.get("/stats", fetchMasterListLevels);
export default router;
