const mongoose = require("mongoose");

const Oparator_AuthorizationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Oparator_Authorization = mongoose.model(
  "Oparator_Authorization",
  Oparator_AuthorizationSchema
);

module.exports = Oparator_Authorization;
