import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import { accountRoutes, authRoutes, scheduleRoutes } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/_index.js";
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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/schedule", scheduleRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
