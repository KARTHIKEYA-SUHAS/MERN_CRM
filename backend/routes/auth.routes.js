import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Authrouter = express.Router();

Authrouter.post("/register", register);
Authrouter.post("/login", login);
Authrouter.get("/me", protect, getMe);
Authrouter.put("/profile", protect, updateProfile);

export default Authrouter;