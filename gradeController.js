// controllers/gradeController.js
// Contains the logic for handling grade-related requests.

const { grades, getNextId } = require("../data/grades");

/**
 * GET /api/grades
 * Returns every grade record currently stored.
 */
function getAllGrades(req, res) {
  res.status(200).json(grades);
}

/**
 * Validates the request body for creating a grade.
 * Returns an error message string if invalid, or null if valid.
 */
function validateGradeInput(body) {
  const { subject, obtainedMarks, totalMarks } = body;

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return "Grade subject is required";
  }

  if (obtainedMarks === undefined || obtainedMarks === null || obtainedMarks === "") {
    return "Obtained marks are required";
  }

  if (totalMarks === undefined || totalMarks === null || totalMarks === "") {
    return "Total marks are required";
  }

  const obtained = Number(obtainedMarks);
  const total = Number(totalMarks);

  if (Number.isNaN(obtained)) {
    return "Obtained marks must be a number";
  }

  if (Number.isNaN(total)) {
    return "Total marks must be a number";
  }

  if (obtained < 0) {
    return "Obtained marks cannot be negative";
  }

  if (total <= 0) {
    return "Total marks must be greater than zero";
  }

  if (obtained > total) {
    return "Obtained marks cannot be greater than total marks";
  }

  return null;
}

/**
 * POST /api/grades
 * Creates a new grade record, calculating the percentage automatically.
 */
function createGrade(req, res) {
  const validationError = validateGradeInput(req.body || {});

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { subject, obtainedMarks, totalMarks } = req.body;
  const obtained = Number(obtainedMarks);
  const total = Number(totalMarks);
  const percentage = Math.round((obtained / total) * 10000) / 100; // 2 decimal places

  const newGrade = {
    id: getNextId(),
    subject: subject.trim(),
    obtainedMarks: obtained,
    totalMarks: total,
    percentage
  };

  grades.push(newGrade);

  res.status(201).json(newGrade);
}

module.exports = {
  getAllGrades,
  createGrade
};
