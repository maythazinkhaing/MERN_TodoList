const express = require("express");
const router = express.Router();
const {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

//GET and POST
router.get("/", getTodo);

router.post("/add", setTodo);

//PUT and DELETE
router.put("/:id/update", updateTodo);

router.delete("/:id/delete", deleteTodo);

module.exports = router;
