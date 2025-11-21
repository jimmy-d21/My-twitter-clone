import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import getShuffledSuggestedUser from "../lib/utils/shuffledSuggestedUsers.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      username,
      fullname,
      currentPassword,
      newPassword,
      confirmPassword,
      bio,
      links,
      profileImage,
      coverImage,
    } = req.body;

    const userId = req.user._id.toString();
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Username check
    if (username && user.username !== username) {
      const existUsername = await User.findOne({ username });
      if (existUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }
      user.username = username;
    }

    // ✅ Fullname check
    if (fullname && user.fullname !== fullname) {
      const existFullname = await User.findOne({ fullname });
      if (existFullname) {
        return res.status(400).json({ error: "Fullname is already taken" });
      }
      user.fullname = fullname;
    }

    // ✅ Password update
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "Please input all the fields" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid Password" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ error: "New password & confirm password must match" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // ✅ Profile image update
    if (profileImage) {
      if (user.profileImage) {
        const imageId = user.profileImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const result = await cloudinary.uploader.upload(profileImage);
      user.profileImage = result.secure_url;
    }

    // ✅ Cover image update
    if (coverImage) {
      if (user.coverImage) {
        const imageId = user.coverImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const result = await cloudinary.uploader.upload(coverImage);
      user.coverImage = result.secure_url;
    }

    // ✅ Bio & links update
    if (bio) user.bio = bio;
    if (links) user.links = links;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(`Error in updateProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const authUserId = req.user._id;

    const authUser = await User.findById(authUserId);
    if (!authUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(400).json({ error: "User not found" });
    }

    if (userId == authUserId) {
      return res.status(400).json({ error: "You can't follow your self" });
    }

    //const existFollowing = authUser.following.includes(targetUser._id);
    const existFollowing = await User.findOne({
      _id: authUser._id,
      following: targetUser._id,
    });
    if (existFollowing) {
      // Unfollow the user
      // Remove targetUser from authUser's "following" array
      await User.findByIdAndUpdate(authUser._id, {
        $pull: { following: targetUser._id },
      });
      // Remove authUserId from targetUser's "followers" array
      await User.findByIdAndUpdate(targetUser._id, {
        $pull: { followers: authUser._id },
      });
      res.status(200).json({ message: "Unfollow Successfully" });
    } else {
      // Follow the user
      // Add targetUser from authUser's "following" array
      await User.findByIdAndUpdate(authUser._id, {
        $push: { following: targetUser._id },
      });
      // Add authUserId from targetUser's "followers" array
      await User.findByIdAndUpdate(targetUser._id, {
        $push: { followers: authUser._id },
      });

      // Send Notification
      const newNotification = new Notification({
        sendTo: targetUser._id,
        commingFrom: authUser._id,
        type: "follow",
      });
      await newNotification.save();

      res.status(200).json({ message: "Follow Successfully", targetUser });
    }
  } catch (error) {
    console.log(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("following");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const userFollowings = await User.find({
      _id: { $in: user.following },
    }).select("following");

    let allFollowingId = [];
    userFollowings.map((f) => {
      allFollowingId = allFollowingId.concat(f.following);
    });

    let suggestedUsers = await User.find({
      _id: {
        $in: allFollowingId,
        $nin: [...user.following, userId],
      },
    });

    if (suggestedUsers.length < 10) {
      const currentSuggestedUserIds = [
        ...user.following,
        userId,
        ...suggestedUsers.map((u) => u._id),
      ];

      const extraUsers = await User.find({
        _id: { $nin: currentSuggestedUserIds },
      });

      suggestedUsers = suggestedUsers.concat(extraUsers);
    }

    suggestedUsers.forEach((user) => {
      user.password = null;
    });

    suggestedUsers = getShuffledSuggestedUser(suggestedUsers);

    res.status(200).json(suggestedUsers.slice(0, 10));
  } catch (error) {
    console.error(`Error in getSuggestedUsers controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserFriendList = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const friends = await User.find({
      $and: [
        { _id: { $in: user.following } },
        { following: { $in: user._id } },
      ],
    });

    res.status(200).json(friends);
  } catch (error) {
    console.log(`Error in getUserFriendList controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
