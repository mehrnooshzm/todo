/**
 * Todo Input Validation Middleware
 * Enforces that both `title` and `dueDate` are mandatory and non-empty for creating and updating tasks.
 */

/**
 * Middleware for validating that both `title` and `dueDate` are present and valid.
 */
const validateTodoInput = (req, res, next) => {
  const { title } = req.body;
  const dueDate = req.body.dueDate || req.body.due_date;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required and cannot be empty" });
  }

  if (!dueDate || typeof dueDate !== "string" || !dueDate.trim()) {
    return res.status(400).json({ error: "Due date is required and cannot be empty" });
  }

  // Sanitize title and dueDate
  req.body.title = title.trim();
  req.body.dueDate = dueDate.trim();
  next();
};

module.exports = {
  validateTitle: validateTodoInput,
  validateOptionalTitle: validateTodoInput,
  validateTodoInput,
};

