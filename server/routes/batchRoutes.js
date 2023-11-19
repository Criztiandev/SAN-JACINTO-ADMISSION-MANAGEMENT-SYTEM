import exporess from "express";
import {
  createBatch,
  deleteBatch,
  fetchAllBatch,
  fetchAllBatchExaminies,
  fetchBatchById,
} from "../controller/batchController.js";
const router = exporess.Router();

router.get("/", fetchAllBatch);
router.get("/examiniees", fetchAllBatchExaminies);
router.get("/:id", fetchBatchById);
router.post("/create", createBatch);
router.delete("/:id", deleteBatch);
export default router;
