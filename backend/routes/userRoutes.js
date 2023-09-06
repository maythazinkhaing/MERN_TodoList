const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//getMe
router.get("/getMe", protect, getMe);

module.exports = router;
