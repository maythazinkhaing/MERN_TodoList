const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
// const Todos = require("../models/todoModel");

// Get Goals
// GET api/todos
// Private
const getTodo = asyncHandler(async (req, res) => {
  const todos = await pool.query("SELECT * FROM todos");

  res.status(200).json(todos.rows);
});

// Set Goals
// POST api/todos/add
// Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error(`Please add a text field.`);
  }

  const { text } = req.body;
  const todo = await pool.query(
    "INSERT INTO todos (text) VALUES($1) RETURNING *",
    [text]
  );

  res.status(200).json(todo);
});

// Update Goals
// PUT api/todos/:id/update
// Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!id) {
    res.status(400);
    throw new Error(`Todo ID not found.`);
  }

  const updatedGoal = await pool.query(
    "UPDATE todos SET text = $1 WHERE todo_id = $2",
    [text, id]
  );

  res.status(200).json(updatedGoal);
});

// Delete Goals
// DELETE api/goals/:id/delete
// Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    res.status(400);
    throw new Error("Todo not found.");
  }

  await pool.query("DELETE FROM todos WHERE todo_id = $1", [id]);

  res.status(200).json({ todo_id: req.params.id });
});

module.exports = { getTodo, setTodo, updateTodo, deleteTodo };
