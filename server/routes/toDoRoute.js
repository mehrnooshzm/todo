/**
 * Todo Routes Router
 * Maps API HTTP endpoints to their corresponding Todo controller handlers with middleware validation.
 */

const express = require("express");
const {
  getAllTodos,
  deleteTodo,
  createTodo,
  updateTodo,
} = require("../controllers/toDoController");
const {
  validateTitle,
  validateOptionalTitle,
} = require("../middleware/validateToDo");

const toDoRouter = express.Router();

// GET /api/todos - Fetch all todo items
toDoRouter.get("/", getAllTodos);

// POST /api/todos - Create a new todo item (Requires valid non-empty title middleware)
toDoRouter.post("/", validateTitle, createTodo);

// PUT /api/todos/:id - Update an existing todo item by ID (Optional title validation middleware)
toDoRouter.put("/:id", validateOptionalTitle, updateTodo);

// DELETE /api/todos/:id - Delete a todo item by ID
toDoRouter.delete("/:id", deleteTodo);
module.exports = toDoRouter;
