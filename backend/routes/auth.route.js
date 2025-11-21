import express from "express";
import {
  getAuthUser,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import authUser from "../middlewares/authUser.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/authUser", authUser, getAuthUser);

export default authRoutes;
