import exporess from "express";
import { fetchAllBatch } from "../controller/batchController.js";
const router = exporess.Router();

router.get("/", fetchAllBatch);

export default router;
