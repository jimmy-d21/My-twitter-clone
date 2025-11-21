import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import getShuffledPost from "../lib/utils/shuffledPost.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { image } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!text && !image) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      image = result.secure_url;
    }

    const newPost = await Post.create({
      owner: user._id,
      text,
      image,
    });

    const createdPost = await Post.findById(newPost._id)
      .populate("owner", "-password")
      .populate("comments.user", "-password");

    res.status(201).json({ message: "Post Created successfully", createdPost });
  } catch (error) {
    console.log(`Error in createPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }
    await Post.findByIdAndDelete(postId);

    res
      .status(201)
      .json({ message: "Post deleted successfully", deletePost: post });
  } catch (error) {
    console.log(`Error in deletePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate("owner", "-password");
    if (!post) return res.status(400).json({ error: "Post not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    const isAlreadyLiked = post.likes.includes(user._id);

    if (isAlreadyLiked) {
      // Unlike Post
      post.likes.pull(user._id);
      user.likePosts.pull(post._id);
      await post.save();
      await user.save();
      return res
        .status(200)
        .json({ message: "Post unliked", updatedPost: post });
    } else {
      // Like Post
      post.likes.push(user._id);
      user.likePosts.push(post._id);
      await post.save();
      await user.save();

      // Send Notification
      if (post.owner._id.toString() !== user._id.toString()) {
        const newNotification = new Notification({
          sendTo: post.owner,
          commingFrom: user._id,
          type: "like",
        });
        await newNotification.save();
      }

      return res.status(200).json({ message: "Post liked", updatedPost: post });
    }
  } catch (error) {
    console.log(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: postId } = req.params;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Post must have text" });
    }

    const post = await Post.findById(postId).populate("owner", "-password");
    if (!post) return res.status(400).json({ error: "Post not found" });

    const comment = { user: userId, text };
    post.comments.push(comment);

    if (post.owner.toString() !== userId.toString()) {
      const newNotification = new Notification({
        sendTo: post.owner,
        commingFrom: userId,
        type: "comment",
        text,
      });
      await newNotification.save();
    }

    await post.save();
    await post.populate("comments.user", "-password");

    res.status(201).json({
      message: "Comment posted successfully",
      updatedPost: post,
    });
  } catch (error) {
    console.log(`Error in commentPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const posts = await Post.find({ owner: user._id })
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(`Error in getAllUserPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllLikedPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likePosts } })
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    const shuffledPost = getShuffledPost(likedPosts);

    res.status(200).json(shuffledPost);
  } catch (error) {
    console.log(`Error in getAllLikedPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllFollowingPosts = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    const followingPosts = await Post.find({ owner: { $in: user.following } })
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    const shuffledPost = getShuffledPost(followingPosts);

    res.status(200).json(shuffledPost);
  } catch (error) {
    console.log(`Error in getAllFollowingPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    const shuffledPost = getShuffledPost(posts);

    res.status(200).json(shuffledPost);
  } catch (error) {
    console.log(`Error in getAllPosts controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
