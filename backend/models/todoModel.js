const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "Please add a text value"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
