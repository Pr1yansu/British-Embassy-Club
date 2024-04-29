const mongoose = require("mongoose");

const Club_AuthorizationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    });

const Club_Authorization = mongoose.model("Club_Authorization", Club_AuthorizationSchema);

module.exports = Club_Authorization;