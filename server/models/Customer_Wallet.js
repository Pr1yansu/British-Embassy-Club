const mongoose = require("mongoose");

const Customer_WalletSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member_Registration",
    },
    amount: {
      type: Number,
      required: true,
    },
    modificationTime: {
        type: Date,
        required: true,
    },
  },
  { timestamps: true }
);

const Customer_Wallet = mongoose.model("Customer_Wallet", Customer_WalletSchema);

module.exports = Customer_Wallet;