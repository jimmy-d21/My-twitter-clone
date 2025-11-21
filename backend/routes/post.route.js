import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  commentPost,
  createPost,
  deletePost,
  getAllFollowingPosts,
  getAllLikedPosts,
  getAllPosts,
  getAllUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.post("/create", authUser, createPost);

postRoutes.delete("/delete-post/:id", authUser, deletePost);
postRoutes.put("/like-unlike-post/:id", authUser, likeUnlikePost);
postRoutes.put("/comment-post/:id", authUser, commentPost);

postRoutes.get("/all-user-post/:username", authUser, getAllUserPosts);
postRoutes.get("/all-liked-post/:username", authUser, getAllLikedPosts);
postRoutes.get("/all-following-post/:id", authUser, getAllFollowingPosts);
postRoutes.get("/all-post", authUser, getAllPosts);

export default postRoutes;
