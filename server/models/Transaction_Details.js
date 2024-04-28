const mongoose = require("mongoose");

const Transaction_DetailsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member_Registration",
    },
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon_Details",
    },
  },
  { timestamps: true }
);

const Transaction_Details = mongoose.model("Transaction_Details", Transaction_DetailsSchema);

module.exports = Transaction_Details;