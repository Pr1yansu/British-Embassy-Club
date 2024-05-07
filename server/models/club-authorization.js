const mongoose = require("mongoose");
const crypto = require("crypto");

const ClubAuthorization = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: ["admin", "club"],
    default: "club",
  },
  otp: {
    type: String,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpire: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

ClubAuthorization.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash(process.env.HASH_ALGO)
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  this.save();
  return resetToken;
};

module.exports = mongoose.model("ClubAuthorization", ClubAuthorization);
