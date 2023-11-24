// If you hack this , your gay

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";

import authRoute from "./routes/authRoutes.js";
import applicantRoute from "./routes/applicantRoutes.js";
import dasboardRoute from "./routes/dashboardRoutes.js";
import scheduleRoute from "./routes/scheduleRoutes.js";
import accountRoute from "./routes/accountRoutes.js";
import batchRoute from "./routes/batchRoutes.js";
import examinieesRoute from "./routes/examinieesRoute.js";
import masterlistRoute from "./routes/masterlistRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import archiveRoute from "./routes/archiveRoute.js";

import { errorHandler, notFound } from "./middleware/_index.js";
import cors from "cors";
import helmet from "helmet";

// Configuration
dotenv.config();
connectDb();

// Initalization
const app = express();
const PORT = process.env.PORT || 6000;

// Middlewares
app.use(express.json()); // to parse json data to req.body
app.use(express.urlencoded({ extended: true })); // to accept form data
app.use(cookieParser()); // to parse cookie data
app.use(cors());
app.use(helmet());
// Routes

app.use("/api/batch", batchRoute);
app.use("/api/auth", authRoute);
app.use("/api/applicant", applicantRoute);
app.use("/api/dashboard", dasboardRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/account", accountRoute);
app.use("/api/examiniees", examinieesRoute);
app.use("/api/masterlist", masterlistRoute);
app.use("/api/message", messageRoute);
app.use("/api/archive", archiveRoute);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
