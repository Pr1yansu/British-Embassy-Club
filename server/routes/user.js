const Router = require("express");
const {
  register,
  getAllOperators,
  updateOperator,
  loginUser,
  getOperatorById,
  forgetPassword,
  resetPassword,
  logout,
  sendResetTokenAgain,
} = require("../controller/user");
const {
  validateRegistration,
  validateLogin,
  validateForgetPassword,
  validateResetPassword,
} = require("../middleware/zod-user-middleware");
const {
  isAuthenticated,
  isAdmin,
  isInClub,
  isOperator,
} = require("../middleware/auth");
const router = Router();

// Routes
router.get("/all", isAuthenticated, isAdmin, getAllOperators);
router.get("/profile", isAuthenticated, isInClub, isOperator, getOperatorById);
router.post(
  "/register",
  isAuthenticated,
  isInClub,
  validateRegistration,
  register
);
router.post("/login", isAuthenticated, isInClub, validateLogin, loginUser);
router.put("/update", isAuthenticated, isInClub, isOperator, updateOperator);
router.put("/forgot-password", validateForgetPassword, forgetPassword);
router.put("/reset-password", validateResetPassword, resetPassword);
router.put(
  "/sned-reset-token-again",
  validateForgetPassword,
  sendResetTokenAgain
);
router.get("/logout", isAuthenticated, logout);

module.exports = router;
