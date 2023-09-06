const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please Enter username."],
    },

    email: {
      type: String,
      require: [true, "Please Enter E-mail."],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please Enter password."],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
