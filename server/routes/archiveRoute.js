import express from "express";
import { deleteArchieve } from "../controller/archieveController.js";
const router = express.Router();

router.delete("/:id", deleteArchieve);
export default router;
