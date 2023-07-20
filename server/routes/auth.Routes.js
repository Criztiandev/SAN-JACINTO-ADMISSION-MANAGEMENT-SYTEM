import express from "express";
import { loginUser } from "../controller/auth.Controller";
const router = express.Router();

router.post("/login", loginUser);

export default router;
