// routes/gradeRoutes.js
// Defines all endpoints under /api/grades

const express = require("express");
const router = express.Router();

const { getAllGrades, createGrade } = require("../controllers/gradeController");

// GET /api/grades
router.get("/", getAllGrades);

// POST /api/grades
router.post("/", createGrade);

module.exports = router;
