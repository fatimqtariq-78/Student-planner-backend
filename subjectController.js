// controllers/subjectController.js
// Contains the logic for handling subject-related requests.

const subjects = require("../data/subjects");

/**
 * GET /api/subjects
 * Returns the predefined list of subjects.
 */
function getAllSubjects(req, res) {
  res.status(200).json(subjects);
}

module.exports = {
  getAllSubjects
};
