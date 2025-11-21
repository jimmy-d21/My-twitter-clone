import generateTokenAndSetCookie from "../lib/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmPasswor } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (password !== confirmPasswor) {
      return res
        .status(400)
        .json({ error: "Password mismatch. Please check and try again." });
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Input" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "Email already exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      const user = await User.findById(newUser._id);
      res.status(201).json(user);
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in signup controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 6 characters" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getAuthUser controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
