const asyncHandler = require("express-async-handler");
const Todos = require("../models/todoModel");
const User = require("../models/userModel");

// Get Goals
// GET api/goals
// Private
const getTodo = asyncHandler(async (req, res) => {
  const todos = await Todos.find({ user: req.user.id });

  res.status(200).json(todos);
});

// Set Goals
// POST api/goals
// Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error(`Please add a text field.`);
  }

  const todo = await Todos.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(todo);
});

// Update Goals
// PUT api/goals/:id
// Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error(`Todo not found.`);
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedGoal = await Todos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// Delete Goals
// DELETE api/goals/:id
// Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found.");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await todo.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getTodo, setTodo, updateTodo, deleteTodo };
