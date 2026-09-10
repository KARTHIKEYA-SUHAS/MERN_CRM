import express from "express";
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Contactrouter = express.Router();
Contactrouter.use(protect);

Contactrouter.route("/").get(getContacts).post(createContact);
Contactrouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default Contactrouter;