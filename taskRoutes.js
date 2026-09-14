// routes/taskRoutes.js
// Defines all endpoints under /api/tasks

const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask
} = require("../controllers/taskController");

// GET /api/tasks
router.get("/", getAllTasks);

// GET /api/tasks/:id
router.get("/:id", getTaskById);

// POST /api/tasks
router.post("/", createTask);

module.exports = router;
