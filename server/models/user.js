const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  _id: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "club", "developer"],
    default: "user",
  },
  holdingCoupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  ],
});

module.exports = mongoose.model("Users", Users);
