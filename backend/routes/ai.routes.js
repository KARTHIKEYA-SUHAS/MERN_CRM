import express from "express";
import {
  aiStatus,
  leadSummary,
  generateEmailDraft,
  salesInsights,
} from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const AIrouter = express.Router();
AIrouter.use(protect);

AIrouter.get("/status", aiStatus);
AIrouter.post("/lead-summary", leadSummary);
AIrouter.post("/generate-email", generateEmailDraft);
AIrouter.post("/sales-insights", salesInsights);

export default AIrouter;