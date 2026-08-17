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
  sortTodos,
} = require("../controllers/toDoController");
const {
  validateTitle,
  validateOptionalTitle,
} = require("../middleware/validateToDo");

const toDoRouter = express.Router();

// ===== IMPORTANT: Route registration order matters =====
// Specific routes (with literal paths like /sort) MUST come before
// general/parameterized routes (like /:id) or Express will match
// the parameterized route first

// GET - Fetch all todo items
toDoRouter.get("/", getAllTodos);

// POST - Create a new todo item
toDoRouter.post("/", validateTitle, createTodo);

// PUT /sort - LITERAL PATH (must be FIRST before /:id route)
// Update todo order after drag-and-drop operations
toDoRouter.put("/sort", sortTodos);

// PUT /:id - PARAMETERIZED PATH (comes after /sort)
// Update an existing todo item by ID
toDoRouter.put("/:id", validateOptionalTitle, updateTodo);

// DELETE /:id - Delete a todo item by ID
toDoRouter.delete("/:id", deleteTodo);

module.exports = toDoRouter;
