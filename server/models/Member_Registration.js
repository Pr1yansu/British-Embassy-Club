const mongoose = require("mongoose");

const Member_RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    profilePic : {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    }
    // ref_id
    }, { timestamps: true});
const Member_Registration = mongoose.model("Member_Registration", Member_RegistrationSchema);

module.exports = Member_Registration;