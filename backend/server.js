import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

import Authrouter from "./routes/auth.routes.js";
import Leadrouter from "./routes/lead.routes.js";
import Contactrouter from "./routes/contact.routes.js";
import Noterouter from "./routes/note.routes.js";
import Taskrouter from "./routes/task.routes.js";
import AIrouter from "./routes/ai.routes.js";
import Analyticsrouter from "./routes/analytics.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
  res.json({ success: true, status: "OK", service: "Crita CRM API" }),
);

app.use("/api/auth", Authrouter);
app.use("/api/leads", Leadrouter);
app.use("/api/contacts", Contactrouter);
app.use("/api/notes", Noterouter);
app.use("/api/tasks", Taskrouter);
app.use("/api/ai", AIrouter);
app.use("/api/analytics", Analyticsrouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Crita CRM API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

start();

export default app;
