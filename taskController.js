// controllers/taskController.js
// Contains the logic for handling task-related requests.

const { tasks, getNextId } = require("../data/tasks");

const VALID_PRIORITIES = ["High", "Medium", "Low"];

/**
 * GET /api/tasks
 * Returns every task currently stored.
 */
function getAllTasks(req, res) {
  res.status(200).json(tasks);
}

/**
 * GET /api/tasks/:id
 * Returns a single task matching the given ID.
 */
function getTaskById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Task id must be a number" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
}

/**
 * Validates the request body for creating a task.
 * Returns an error message string if invalid, or null if valid.
 */
function validateTaskInput(body) {
  const { title, subject, priority, dueDate } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return "Task title is required";
  }

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return "Task subject is required";
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return "Priority must be High, Medium, or Low";
  }

  if (dueDate !== undefined && dueDate !== null && dueDate !== "") {
    const parsedDate = new Date(dueDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return "Due date must be a valid date";
    }
  }

  return null;
}

/**
 * POST /api/tasks
 * Creates a new task from the JSON request body.
 */
function createTask(req, res) {
  const validationError = validateTaskInput(req.body || {});

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { title, note, subject, priority, dueDate } = req.body;

  const newTask = {
    id: getNextId(),
    title: title.trim(),
    note: typeof note === "string" ? note.trim() : "",
    subject: subject.trim(),
    priority: priority || "Medium",
    dueDate: dueDate || null,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask
};
