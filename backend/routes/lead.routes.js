import express from "express";
import {
  getLead,
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  reorderLeads,
} from "../controllers/lead.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Leadrouter = express.Router();

Leadrouter.use(protect);

Leadrouter.patch("/reorder", reorderLeads);
Leadrouter.route("/").get(getLeads).post(createLead);
Leadrouter.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

export default Leadrouter;