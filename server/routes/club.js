const Router = require("express");
const {
  createClub,
  login,
  forgetPassword,
  resetPassword,
  getProfile,
  updateClub,
  resendOtp,
  verifyOtp,
} = require("../controller/club");
const {
  validateClubRegistration,
  validateClubLogin,
  validateForgetPassword,
  validateResetPassword,
} = require("../middleware/zod-club-middleware");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { verifyOtpSchema } = require("../utils/club-zod-schema");

const app = Router();

app.post("/create", validateClubRegistration, createClub);
app.post("/login", validateClubLogin, login);
app.put("/verify-otp", verifyOtpSchema, verifyOtp);
app.put("/resend-otp", resendOtp);
app.put("/update", isAuthenticated, isAdmin, updateClub);
app.get("/profile", isAuthenticated, isAdmin, getProfile);
app.put("/forget-password", validateForgetPassword, forgetPassword);
app.put("/reset-password", validateResetPassword, resetPassword);

module.exports = app;
