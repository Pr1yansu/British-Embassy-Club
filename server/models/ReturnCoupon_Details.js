const mongoose = require("mongoose");

const ReturnCoupon_DetailsSchema = new mongoose.Schema({
    couponAmount: {
        type: Number,
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member_Registration",
    },
    },{timestamps: true});

const ReturnCoupon_Details = mongoose.model("ReturnCoupon_Details", ReturnCoupon_DetailsSchema);

module.exports = ReturnCoupon_Details;