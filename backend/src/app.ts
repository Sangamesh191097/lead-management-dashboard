import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import { errorHandler } from "./middlewares/error.middleware";
import aiRoutes from "./routes/ai.routes";
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Lead Management API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

export default app;