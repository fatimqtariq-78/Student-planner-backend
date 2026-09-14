// server.js
// Entry point for the StudyFlow Student Planner Backend API.
// DecodeLabs Internship — Project 2 (Backend API Development)

const express = require("express");

const taskRoutes = require("./routes/taskRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

const app = express();
const PORT = 3000;

// ---------- MIDDLEWARE ----------
// Parses incoming JSON request bodies into req.body
app.use(express.json());

// ---------- ROOT ROUTE ----------
app.get("/", (req, res) => {
  res.status(200).json({ message: "StudyFlow API is running" });
});

// ---------- API ROUTES ----------
app.use("/api/tasks", taskRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/subjects", subjectRoutes);

// ---------- 404 HANDLER ----------
// Runs when no route above matched the request.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ---------- GLOBAL ERROR HANDLER ----------
// Catches unexpected errors (including malformed JSON bodies) so the
// server never crashes and always responds with JSON.
app.use((err, req, res, next) => {
  console.error("Unexpected server error:", err.message);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }

  res.status(500).json({ error: "Internal server error" });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`StudyFlow API is running on http://localhost:${PORT}`);
});
