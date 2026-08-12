/**
 * Todo Routes Router
 * Maps API HTTP endpoints to their corresponding Todo controller handlers with middleware validation.
 */

const express = require("express");
const todoController = require("../controllers/toDoController");
const { validateTitle, validateOptionalTitle } = require("../middleware/validateTitle");

const toDoRouter = express.Router();

// GET /api/todos - Fetch all todo items
toDoRouter.get("/", todoController.getAllTodos);

// POST /api/todos - Create a new todo item (Requires valid non-empty title middleware)
toDoRouter.post("/", validateTitle, todoController.createTodo);

// PUT /api/todos/:id - Update an existing todo item by ID (Optional title validation middleware)
toDoRouter.put("/:id", validateOptionalTitle, todoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo item by ID
toDoRouter.delete("/:id", todoController.deleteTodo);

module.exports = toDoRouter;
