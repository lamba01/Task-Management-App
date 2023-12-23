const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function taskFormController(req, res) {
  const taskData = req.body;
  const token = req.headers.authorization;

  try {
    // Check if the token is provided in the request headers
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      db.query(
        "INSERT INTO tasks (board_id, task_name, description, status) VALUES (?, ?, ?, ?)",
        [
          taskData.boardId,
          taskData.taskName,
          taskData.description,
          taskData.status,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting user data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // If subtasks are provided, insert them into the database
          if (taskData.subTasks && taskData.subTasks.length > 0) {
            const subTaskValues = taskData.subTasks.map((subTask) => [
              result.insertId, // The ID of the main task
              subTask,
            ]);

            db.query(
              "INSERT INTO subtasks (task_id, subtask_name) VALUES ?",
              [subTaskValues],
              (subTaskError) => {
                if (subTaskError) {
                  console.error("Error inserting subtasks:", subTaskError);
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }

                console.log("Task and subtasks data are inserted successfully");
                return res.json({ message: "Task created successfully" });
              }
            );
          } else {
            // If no subtasks provided, respond with success
            console.log("Task data is inserted successfully");
            return res.json({ message: "Task created successfully" });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in taskFormController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = taskFormController;
