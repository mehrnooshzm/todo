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





/** Update an existing todo by ID with title or completed fields */
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

/** Delete a todo item by ID */
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

