import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Taskrouter = express.Router();
Taskrouter.use(protect);

Taskrouter.route("/").get(getTasks).post(createTask);
Taskrouter.route("/:id").put(updateTask).delete(deleteTask);

export default Taskrouter;