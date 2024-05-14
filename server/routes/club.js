const Router = require("express");
const {
  createClub,
  login,
  forgetPassword,
  resetPassword,
  verifyAccessKey,
  temporaryLogin,
  logout,
  getProfile,
} = require("../controller/club");
const {
  validateClubRegistration,
  validateClubLogin,
  validateForgetPassword,
} = require("../middleware/zod-club-middleware");
const { isAuthenticated } = require("../middleware/auth");

const app = Router();

app.post("/create", validateClubRegistration, createClub);
app.get("/profile", isAuthenticated, getProfile);
app.post("/verify-accessKey", verifyAccessKey);
app.post("/login", validateClubLogin, login);
app.post("/forget-password", validateForgetPassword, forgetPassword);
app.post("/temporary-login", validateClubLogin, temporaryLogin);

module.exports = app;
