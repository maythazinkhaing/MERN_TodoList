const express = require("express");
const router = express.Router();
const {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware");

//GET
router.get("/", protect, getTodo);

//POST
router.post("/add", protect, setTodo);

//PUT
router.put("/:id/update", protect, updateTodo);

//DELETE
router.delete("/:id/delete", protect, deleteTodo);

module.exports = router;
