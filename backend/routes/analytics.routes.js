import express from "express";
import { getOverview } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Analyticsrouter = express.Router();
Analyticsrouter.use(protect);

Analyticsrouter.get("/overview", getOverview);

export default Analyticsrouter;