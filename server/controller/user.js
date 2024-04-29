const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Node_cache = require("node-cache");

const node_cache = new Node_cache();

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    if (node_cache.has("users")) {
      return res.status(200).json(node_cache.get("users"));
    }
    node_cache.set("users", users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register user
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      mobileNumber,
      address,
      expiryDate,
      profileImage,
    } = req.body;

    const user = await Users.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (user) {
      return res.status(400).json({
        message: "User with this email or mobile number already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      address,
      expiryDate,
      profileImage,
    });
    const payload = {
      user: {
        id: newUser._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
