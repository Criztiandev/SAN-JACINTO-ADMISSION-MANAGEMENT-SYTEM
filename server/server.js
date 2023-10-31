import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import applicantRoute from "./routes/applicantRoutes.js";
import dasboardRoute from "./routes/dashboardRoutes.js";
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

app.use("/api/applicant", applicantRoute);
app.use("/api/dashboard", dasboardRoute);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
