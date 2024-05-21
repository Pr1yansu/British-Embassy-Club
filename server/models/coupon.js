const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  memberId: {
    type: String,
    ref: "MemberSchema",
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
    default: Date.now() + 1000 * 60 * 60 * 24 * 365,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponSchema", couponSchema);
