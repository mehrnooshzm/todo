/**
 * Todo API Service Layer
 * Wrapper functions for making HTTP REST requests to the Express backend.
 */

import api from "@/api/axios";

/** Fetch all todos */
export const getTodos = () => api.get("/todos");

/** Create a new todo with title string and optional dueDate string */
export const createTodo = (title, dueDate) =>
  api.post("/todos", { title, dueDate: dueDate || null });

/**
 * Sort/Reorder todos after a drag-and-drop operation.
 * Sends the new order of todos to the backend to persist the changes.
 * @param {Array<{id: number, ...}>} todos - Array of todo objects in their new order from drag-and-drop
 * @returns {Promise} API response containing the updated sorted todos list
 */
export const sortTodos = (todos) => api.put("/todos/sort", { todos });

/** Update an existing todo by ID with title or completed fields */
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

/** Delete a todo item by ID */
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
