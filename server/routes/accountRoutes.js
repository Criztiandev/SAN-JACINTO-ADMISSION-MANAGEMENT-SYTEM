import express from "express";
import { authenticatedController } from "../controller/accountController.js";
const router = express.Router();

router.get("/:UID", authenticatedController);

export default router;
