const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Node_cache = require("node-cache");

const node_cache = new Node_cache();

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
    res.status(200).json({ statusCode: 200, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      id,
      username,
      password,
      mobileNumber,
      address,
      expiryDate,
      profileImage,
    } = req.body;

    const user = await Users.findOne({
      $or: [{ _id: id, mobileNumber }],
    });

    if (user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User with this id or mobile number already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
      _id: id,
      username,
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
    res.status(201).json({
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await Users.findById({ id });
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      res.status(400).json({
        statusCode: 400,
        message: "Credentials not matched",
      });
    }
    const payload = {
      user: {
        id: user._id,
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
    res.status(200).json({
      statusCode: 200,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
