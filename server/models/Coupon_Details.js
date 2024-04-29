const mongoose = require("mongoose");

const Coupon_DetailsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    couponDetails: {
        type: String,
        required: true,
    }
    }, { timestamps: true} );

const Coupon_Details = mongoose.model("Coupon_Details", Coupon_DetailsSchema);

module.exports = Coupon_Details;