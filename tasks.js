// data/tasks.js
// Temporary in-memory data storage for tasks.
// NOTE: This is NOT a database. Data resets every time the server restarts.
// Project 3 will replace this with persistent database storage.

let tasks = [
  {
    id: 1,
    title: "DBMS Assignment",
    note: "Complete Chapter 3 questions",
    subject: "Database Systems",
    priority: "Medium",
    dueDate: "2026-09-05",
    completed: false
  },
  {
    id: 2,
    title: "DSA Practice Sheet",
    note: "Solve linked list and stack problems",
    subject: "Data Structures",
    priority: "High",
    dueDate: "2026-09-03",
    completed: false
  }
];

// Keeps track of the next unique ID to assign to a new task.
let nextId = 3;

function getNextId() {
  const id = nextId;
  nextId += 1;
  return id;
}

module.exports = {
  tasks,
  getNextId
};
