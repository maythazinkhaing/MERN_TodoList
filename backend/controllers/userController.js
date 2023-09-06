const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST user
// POST api/user/register
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields!");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exist.");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPwd,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      Username: user.username,
      Email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data...");
  }
});

// POST login user
// POST api/user/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      Username: user.username,
      Email: user.email,
      Token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email or Password does not match!");
  }
});

// POST user
// POST api/user/getMe
// Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    Id: _id,
    Username: username,
    Email: email,
  });
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
