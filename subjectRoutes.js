// routes/subjectRoutes.js
// Defines all endpoints under /api/subjects

const express = require("express");
const router = express.Router();

const { getAllSubjects } = require("../controllers/subjectController");

// GET /api/subjects
router.get("/", getAllSubjects);

module.exports = router;
