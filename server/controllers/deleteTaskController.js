const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function deleteTaskController(req, res) {
  const { taskId } = req.params;
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

      // Delete the task and its subtasks from the database
      db.query(
        "DELETE FROM tasks WHERE task_id = ?",
        [taskId],
        (deleteError) => {
          if (deleteError) {
            console.error("Error deleting task:", deleteError);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // If the task has subtasks, delete them too
          db.query(
            "DELETE FROM subtasks WHERE task_id = ?",
            [taskId],
            (deleteSubtasksError) => {
              if (deleteSubtasksError) {
                console.error("Error deleting subtasks:", deleteSubtasksError);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              console.log("Task and subtasks deleted successfully");
              return res.json({
                message: "Task and subtasks deleted successfully",
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Error in deleteTaskController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = deleteTaskController;
