/**
 * Todo Controller
 * Handles request parsing, SQL query execution, and response formatting for Todo endpoints.
 * Supports title, completion status, and optional due_date field.
 */

const db = require("../db");

/** Helper function to format SQL DATE fields into YYYY-MM-DD strings without timezone conversion issues */
const formatDate = (dateVal) => {
  if (!dateVal) return null;
  if (typeof dateVal === "string") return dateVal.split("T")[0];
  if (dateVal instanceof Date) {
    const year = dateVal.getFullYear();
    const month = String(dateVal.getMonth() + 1).padStart(2, "0");
    const day = String(dateVal.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return String(dateVal);
};


/**
 * GET /api/todos
 * Retrieves all todo records from the database.
 * Formats `completed` as boolean, and provides `dueDate` as YYYY-MM-DD string.
 */
const getAllTodos = async (req, res) => {
  try {
    const [todos] = await db.query("SELECT * FROM todos");
    // Format response fields
    const result = todos.map((t) => {
      const formattedDate = formatDate(t.dueDate);
      return {
        ...t,
        completed: !!t.completed,
        dueDate: formattedDate,
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/todos
 * Creates a new todo item in the database with mandatory title and dueDate.
 * @param {string} req.body.title - Mandatory task title
 * @param {string} req.body.dueDate - Mandatory due date string (YYYY-MM-DD)
 */
const createTodo = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    // Validate mandatory fields
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!dueDate || !dueDate.trim()) {
      return res.status(400).json({ error: "Due date is required" });
    }

    // Insert new todo row into database with dueDate column
    const [result] = await db.query(
      "INSERT INTO todos (title, completed, dueDate) VALUES (?, 0, ?)",
      [title.trim(), dueDate.trim()]
    );

    // Fetch inserted record by insertId
    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [
      result.insertId,
    ]);

    const newTodo = rows[0];
    const formattedDate = formatDate(newTodo.dueDate);
    res.status(201).json({
      ...newTodo,
      completed: !!newTodo.completed,
      dueDate: formattedDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /api/todos/:id
 * Updates an existing todo item's title, completed status, and/or dueDate by ID.
 * @param {number} req.params.id - Todo ID parameter
 * @param {string} [req.body.title] - Updated title
 * @param {boolean} [req.body.completed] - Updated completion status
 * @param {string} [req.body.dueDate] - Updated dueDate string
 */
const updateTodo = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Check if target todo exists
    const [existingRows] = await db.query(
      "SELECT * FROM todos WHERE id = ?",
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const existing = existingRows[0];

    // Validate if title or dueDate are provided as empty strings
    if (req.body.title !== undefined && (!req.body.title || !req.body.title.trim())) {
      return res.status(400).json({ error: "Title is required and cannot be empty" });
    }
    if (req.body.dueDate !== undefined && (!req.body.dueDate || !req.body.dueDate.trim())) {
      return res.status(400).json({ error: "Due date is required and cannot be empty" });
    }

    // Preserve existing title/completed/dueDate values if not explicitly provided
    const title = req.body.title !== undefined ? req.body.title.trim() : existing.title;
    const completed =
      req.body.completed !== undefined ? (req.body.completed ? 1 : 0) : existing.completed;
    const dueDate =
      req.body.dueDate !== undefined ? req.body.dueDate.trim() : existing.dueDate;

    // Execute update query in database with dueDate column
    await db.query(
      "UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?",
      [title, completed, dueDate, id]
    );

    // Fetch updated record to return to client
    const [updatedRows] = await db.query("SELECT * FROM todos WHERE id = ?", [
      id,
    ]);
    const updated = updatedRows[0];
    const formattedDate = formatDate(updated.dueDate);
    res.json({
      ...updated,
      completed: !!updated.completed,
      dueDate: formattedDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








/**
 * DELETE /api/todos/:id
 * Removes a todo record from the database by ID.
 * @param {number} req.params.id - Todo ID parameter
 */
const deleteTodo = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Check if target todo exists before deleting
    const [existingRows] = await db.query(
      "SELECT * FROM todos WHERE id = ?",
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Delete record from database
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

