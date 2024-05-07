const ClubAuthorization = require("../models/club-authorization");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail-service");
const cron = require("node-cron");

exports.createClub = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingClub = await ClubAuthorization.findOne({ username });
    if (existingClub) {
      return res.status(400).json({
        statusCode: 400,
        message: "Club already exists",
        data: null,
      });
    }

    const otp = crypto.randomBytes(10).toString("hex");
    const hashedPassword = bcrypt.hashSync(password, 10);
    const club = await ClubAuthorization.create({
      username,
      password: hashedPassword,
      otp,
    });

    const payload = {
      club: {
        username: club.username,
        role: club.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24,
    });

    sendMail(process.env.CLUB_EMAIL, "OTP Verification", otp);

    return res
      .cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(201)
      .json({
        statusCode: 201,
        message: "Club created successfully",
        data: user,
        exception: null,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error || null,
      data: null,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const { username } = req.club;

    const club = await ClubAuthorization.findOne
      .where("username")
      .equals(username)
      .where("otp")
      .equals(otp)
      .exec();

    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid OTP",
        data: null,
        error: null,
      });
    }
    club.otp = null;
    await club.save();

    return res.status(200).json({
      statusCode: 200,
      message: "OTP verified successfully",
      data: club,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { username } = req.club;

    const club = await ClubAuthorization.findOne
      .where("username")
      .equals(username)
      .exec();

    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Club not found",
        data: null,
        error: null,
      });
    }

    const otp = crypto.randomBytes(10).toString("hex");
    club.otp = otp;
    await club.save();

    return res.status(200).json({
      statusCode: 200,
      message: "OTP sent successfully",
      data: club,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};

cron.schedule("0 * * * *", async () => {
  try {
    await ClubAuthorization.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 1000 * 60 * 60) },
    });
    console.log("Expired records deleted");
  } catch (error) {
    console.error("Error deleting expired records:", error);
  }
});

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const club = await ClubAuthorization.findOne({ username });

    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid username or password",
        data: null,
        error: null,
      });
    }

    const isMatch = await bcrypt.compare(password, club.password);
    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid username or password",
        data: null,
        error: null,
      });
    }

    const payload = {
      club: {
        username: club.username,
        role: club.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24,
    });

    return res
      .cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({
        statusCode: 200,
        message: "Login successful",
        data: club,
        error: null,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const { username } = req.club;
    const club = await ClubAuthorization.findOne({
      username,
    });
    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Club not found",
        data: null,
        error: null,
      });
    }

    const { newPassword, newUsername } = req.body;
    const newToken = jwt.sign(
      {
        username: newUsername,
        role: club.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      }
    );

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    club.password = hashedPassword;
    club.username = newUsername;
    club.accessKey = newToken;
    await club.save();

    return res
      .cookie("auth-token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({
        statusCode: 200,
        message: "Club updated successfully",
        data: club,
        error: null,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.club;
    const club = await ClubAuthorization.findOne({ username });
    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Club not found",
        data: null,
        error: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Club profile fetched successfully",
      data: club,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const club = await ClubAuthorization.findOne({ username });
    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Club not found",
        data: null,
        error: null,
      });
    }

    const resetToken = await club.getResetToken();

    const url = `${process.env.FRONTEND_URL}/club/reset-password/${resetToken}`;

    const text = `You have requested for password reset. Please click on this link to reset your password ${url}. If you have not requested for password reset, please ignore this email.`;

    await sendMail(process.env.CLUB_EMAIL, "Reset Password", text);
    console.log(resetToken);

    return res.status(200).json({
      statusCode: 200,
      message: "Reset password token generated successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    console.log(token, newPassword);

    if (!token || !newPassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "Token and password are required",
        data: null,
        error: null,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "Passwords do not match",
        data: null,
        error: null,
      });
    }

    const hashedToken = crypto
      .createHash(process.env.HASH_ALGO)
      .update(token)
      .digest("hex");

    const club = await ClubAuthorization.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!club) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid token or token has expired",
        data: null,
        error: null,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    club.password = hashedPassword;
    club.resetPasswordToken = null;
    club.resetPasswordTokenExpires = null;

    await club.save();

    return res.status(200).json({
      statusCode: 200,
      message: "Password reset successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      data: null,
      error: error.toString(),
    });
  }
};
