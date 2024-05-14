const Router = require("express");
const {
  updateClub,
  resetPassword,
  logout,
} = require("../controller/club");

const {
  isAuthenticated,
  isAdmin,
  isTemporaryAdmin,
} = require("../middleware/auth");
const { validateResetPassword } = require("../middleware/zod-user-middleware");

const app = Router();

app.put("/update", isAuthenticated, isAdmin, updateClub);
app.put(
  "/reset-password",
  isAuthenticated,
  isTemporaryAdmin,
  validateResetPassword,
  resetPassword
);
app.get("/logout", isAuthenticated, isAdmin, logout);
app.get("/temporary-logout", isAuthenticated, isTemporaryAdmin, logout);

module.exports = app;
