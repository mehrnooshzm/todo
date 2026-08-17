/**
 * Todo Input Validation Middleware
 * validateTodoInput: enforces that both `title` and `dueDate` are mandatory and non-empty (used for create).
 * validateOptionalTodoInput: validates `title`/`dueDate` only if present, allows partial updates.
 */

/**
 * Middleware for validating that both `title` and `dueDate` are present and valid.
 * Use on the create (POST) route where both fields are required.
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

/**
 * Middleware for validating `title`/`dueDate` only if they were provided.
 * Use on the update (PUT) route so partial/dynamic updates are allowed.
 * Fields that are absent are left untouched; fields that are present but empty are rejected.
 */
const validateOptionalTodoInput = (req, res, next) => {
  const hasTitle = req.body.title !== undefined;
  const hasDueDate = req.body.dueDate !== undefined || req.body.due_date !== undefined;

  if (hasTitle) {
    const { title } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is required and cannot be empty" });
    }
    req.body.title = title.trim();
  }

  if (hasDueDate) {
    const dueDate = req.body.dueDate || req.body.due_date;
    if (!dueDate || typeof dueDate !== "string" || !dueDate.trim()) {
      return res.status(400).json({ error: "Due date is required and cannot be empty" });
    }
    req.body.dueDate = dueDate.trim();
  }

  next();
};

module.exports = {
  validateTitle: validateTodoInput,
  validateOptionalTitle: validateOptionalTodoInput,
  validateTodoInput,
  validateOptionalTodoInput,
};