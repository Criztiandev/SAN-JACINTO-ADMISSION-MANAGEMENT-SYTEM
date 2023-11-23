import express from "express";
import {
  annoucementBatch,
  messageApplicant,
} from "../controller/messageController.js";

const router = express.Router();
router.post("/:id", messageApplicant);
router.post("/annoucement/:id", annoucementBatch);

export default router;
