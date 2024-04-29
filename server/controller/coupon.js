const Coupon = require("../models/coupon");

// Create coupon
exports.createCoupon = async (req, res) => {
  try {
    const { amount, expiryDate, type } = req.body;
    await new Coupon.create({
      amount,
      expiryDate,
      type,
    });
    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
