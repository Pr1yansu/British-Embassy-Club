const mongoose = require("mongoose");

const User_TokenSchema = new mongoose.Schema(
  {
    oparator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Oparator_Authorization",
    },
    userToken: {
      type: String,
      required: true,
    },
    expiryTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const User_Token = mongoose.model("User_Token", User_TokenSchema);

module.exports = User_Token;
