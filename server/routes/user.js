const Router = require("express");
const { register, getAllUsers } = require("../controller/user");
const validateRegistration = require("../middleware/zod-user-middleware");

const router = Router();

// Routes
router.get("/all", getAllUsers);
router.post("/register", validateRegistration, register);
router.get("/login");
router.get("/update");
router.get("/forgot-password");
router.get("/reset-password");
router.get("/logout");

module.exports = router;
