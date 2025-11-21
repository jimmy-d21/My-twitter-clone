import express from "express";
import {
  followUnFollowUser,
  getSuggestedUsers,
  getUserFriendList,
  getUserProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRoutes = express.Router();

userRoutes.get("/profile/:username", authUser, getUserProfile);
userRoutes.get("/suggested-users", authUser, getSuggestedUsers);
userRoutes.put("/update-profile", authUser, updateProfile);
userRoutes.put("/follow-unfollow/:id", authUser, followUnFollowUser);
userRoutes.get("/friends/:username", authUser, getUserFriendList);

export default userRoutes;
