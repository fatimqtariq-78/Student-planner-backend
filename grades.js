// data/grades.js
// Temporary in-memory data storage for grades.
// NOTE: This is NOT a database. Data resets every time the server restarts.
// Project 3 will replace this with persistent database storage.

let grades = [
  {
    id: 1,
    subject: "Computer Organization & Assembly Language",
    obtainedMarks: 50,
    totalMarks: 70,
    percentage: 71.43
  }
];

// Keeps track of the next unique ID to assign to a new grade record.
let nextId = 2;

function getNextId() {
  const id = nextId;
  nextId += 1;
  return id;
}

module.exports = {
  grades,
  getNextId
};
