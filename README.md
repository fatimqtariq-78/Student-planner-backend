# StudyFlow — Student Planner Backend API

## Project Description

This is the backend API for the StudyFlow Student Planner, built for the **DecodeLabs Full Stack Development Internship — Project 2 (Backend API Development)**. It is a standalone Node.js + Express server that exposes REST-style endpoints for managing **tasks**, **grades**, and **subjects**.

This project is deliberately kept independent of Project 1 (the frontend) and does not yet talk to any frontend or database — its only job is to demonstrate solid backend/API fundamentals.

## Project Objective

This project demonstrates:

- Building a backend server with Node.js and Express
- REST-style API design (resources, HTTP methods, status codes)
- Handling GET and POST requests
- Reading and returning JSON
- Server-side input validation
- Consistent error handling and appropriate HTTP status codes

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON

No database, ORM, or frontend framework is used in this project.

## Installation

1. Install [Node.js](https://nodejs.org/) (v16 or later recommended).
2. Open the `studyflow-api` folder in VS Code.
3. Open the integrated terminal (`` Ctrl+` ``).
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   node server.js
   ```

   or, using the npm script:

   ```bash
   npm start
   ```

You should see:

```text
StudyFlow API is running on http://localhost:3000
```

## Server URL

```text
http://localhost:3000
```

The root endpoint (`GET /`) returns:

```json
{ "message": "StudyFlow API is running" }
```

## Project Structure

```text
studyflow-api/
│
├── package.json
├── server.js
├── README.md
│
├── routes/
│   ├── taskRoutes.js
│   ├── gradeRoutes.js
│   └── subjectRoutes.js
│
├── controllers/
│   ├── taskController.js
│   ├── gradeController.js
│   └── subjectController.js
│
└── data/
    ├── tasks.js
    ├── grades.js
    └── subjects.js
```

- **`server.js`** creates the Express app, applies middleware, mounts the three route groups, and handles 404s and unexpected errors.
- **`routes/`** define which HTTP method + URL maps to which controller function.
- **`controllers/`** contain the actual logic: validating input, reading/writing data, and sending responses.
- **`data/`** hold the temporary in-memory arrays that stand in for a real database.

## What is JSON, and why does the API use it?

JSON (JavaScript Object Notation) is a lightweight, text-based format for representing structured data as key-value pairs — for example `{"title": "DBMS Assignment", "completed": false}`. APIs use JSON because it's easy for both humans and machines to read, it maps naturally onto JavaScript objects, and virtually every programming language and HTTP client (browsers, Postman, mobile apps) can parse it.

- A **JSON request body** is the JSON data the client sends, usually with a POST request — e.g. the task details being created.
- A **JSON response body** is the JSON data the server sends back — e.g. the newly created task, a list of tasks, or an error message.

In this project, `app.use(express.json())` in `server.js` automatically parses incoming JSON request bodies into `req.body` so the controllers can read them directly.

## API Endpoints

| Method | Endpoint          | Purpose                          |
| ------ | ----------------- | --------------------------------- |
| GET    | `/`                | Health check / API status         |
| GET    | `/api/tasks`       | Get all tasks                     |
| GET    | `/api/tasks/:id`   | Get a single task by ID           |
| POST   | `/api/tasks`       | Create a new task                 |
| GET    | `/api/grades`      | Get all grade records             |
| POST   | `/api/grades`      | Create a new grade record         |
| GET    | `/api/subjects`    | Get the predefined subject list   |

## Request & Response Examples

### Create a Task — `POST /api/tasks`

**URL:**
```text
POST http://localhost:3000/api/tasks
```

**Headers:**
```text
Content-Type: application/json
```

**Body:**
```json
{
  "title": "DSA Assignment",
  "note": "Complete linked list questions",
  "subject": "Data Structures",
  "priority": "High",
  "dueDate": "2026-09-08"
}
```

**Expected response — `201 Created`:**
```json
{
  "id": 3,
  "title": "DSA Assignment",
  "note": "Complete linked list questions",
  "subject": "Data Structures",
  "priority": "High",
  "dueDate": "2026-09-08",
  "completed": false
}
```

**Invalid example (missing title) — `400 Bad Request`:**
```json
{ "error": "Task title is required" }
```

### Get a Single Task — `GET /api/tasks/:id`

```text
GET http://localhost:3000/api/tasks/1
```

**Found — `200 OK`:**
```json
{
  "id": 1,
  "title": "DBMS Assignment",
  "note": "Complete Chapter 3 questions",
  "subject": "Database Systems",
  "priority": "Medium",
  "dueDate": "2026-09-05",
  "completed": false
}
```

**Not found — `404 Not Found`:**
```json
{ "error": "Task not found" }
```

### Create a Grade — `POST /api/grades`

**URL:**
```text
POST http://localhost:3000/api/grades
```

**Headers:**
```text
Content-Type: application/json
```

**Body:**
```json
{
  "subject": "Computer Organization & Assembly Language",
  "obtainedMarks": 50,
  "totalMarks": 70
}
```

**Expected response — `201 Created`:**
```json
{
  "id": 1,
  "subject": "Computer Organization & Assembly Language",
  "obtainedMarks": 50,
  "totalMarks": 70,
  "percentage": 71.43
}
```

**Invalid example (obtained > total) — `400 Bad Request`:**
```json
{ "error": "Obtained marks cannot be greater than total marks" }
```

### Get Subjects — `GET /api/subjects`

```text
GET http://localhost:3000/api/subjects
```

**Response — `200 OK`:**
```json
[
  "Data Structures",
  "Computer Networks",
  "Computer Organization & Assembly Language",
  "Database Systems",
  "Digital Logic Design",
  "Probability & Statistics",
  "Entrepreneurship"
]
```

## Validation Rules

**Tasks**
- `title` is required and cannot be empty.
- `subject` is required and cannot be empty.
- `priority`, if provided, must be exactly one of `High`, `Medium`, or `Low` (defaults to `Medium` if omitted).
- `dueDate`, if provided, must be a valid date value.

**Grades**
- `subject` is required and cannot be empty.
- `obtainedMarks` and `totalMarks` are required and must be numbers.
- `obtainedMarks` cannot be negative.
- `totalMarks` must be greater than zero.
- `obtainedMarks` cannot be greater than `totalMarks`.
- `percentage` is calculated automatically by the server as `(obtainedMarks / totalMarks) × 100`, rounded to 2 decimal places.

## HTTP Status Codes Used

| Code | Meaning              | When it's used                                      |
| ---- | -------------------- | ---------------------------------------------------- |
| 200  | OK                    | A GET request succeeded                              |
| 201  | Created               | A POST request successfully created a resource       |
| 400  | Bad Request           | Missing/invalid input (validation failed)             |
| 404  | Not Found             | A task ID doesn't exist, or the route doesn't exist   |
| 500  | Internal Server Error | An unexpected error occurred on the server            |

## Testing

You can test every endpoint with **Postman**, **Thunder Client** (VS Code extension), or your **browser** (for GET requests only, since browsers can't easily send POST bodies).

**Testing a GET endpoint (browser or Postman):**
1. Open Postman/Thunder Client, or just visit the URL in your browser.
2. Set the method to `GET`.
3. Enter the URL, e.g. `http://localhost:3000/api/tasks`.
4. Send the request and check the JSON response.

**Testing a POST endpoint (Postman/Thunder Client only):**
1. Set the method to `POST`.
2. Enter the URL, e.g. `http://localhost:3000/api/tasks`.
3. Go to the **Headers** tab and add `Content-Type: application/json`.
4. Go to the **Body** tab, choose **raw** → **JSON**, and paste a JSON body (see examples above).
5. Send the request and check both the response body and the status code shown by the tool.

Try both valid and invalid bodies to see the `201 Created` and `400 Bad Request` behavior.

## Data Storage

Project 2 intentionally uses **temporary, in-memory data storage** — plain JavaScript arrays inside the `data/` folder (seeded with a couple of example records). This is **not a database**: all data resets back to the seed values every time the server restarts, and it is not shared across multiple server instances.

This keeps the focus of Project 2 entirely on backend/API fundamentals — routing, request handling, validation, and responses — without the added complexity of a database layer.

## Project 3

The next stage of this project will replace the in-memory arrays in `data/` with persistent storage in a real database (SQL or NoSQL), including schema design, relationships, and database-backed CRUD operations. No database integration, ORM, or SQL has been implemented in this project — that work belongs entirely to Project 3.
