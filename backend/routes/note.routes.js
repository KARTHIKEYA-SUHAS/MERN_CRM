import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Noterouter = express.Router();
Noterouter.use(protect);

Noterouter.route("/").get(getNotes).post(createNote);
Noterouter.route("/id").put(updateNote).delete(deleteNote);

export default Noterouter;