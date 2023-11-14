import express from "express";
import { fetchAllExaminiees } from "../controller/examinieesController.js";

const router = express.Router();

router.get("/", fetchAllExaminiees);

export default router;
