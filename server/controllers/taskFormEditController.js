// taskFormEditController.js
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function editTaskController(req, res) {
  const { taskId } = req.params;
  const taskData = req.body;
  const token = req.headers.authorization;

  try {
    // Check if the token is provided in the request headers
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      db.query(
        "UPDATE tasks SET task_name = ?, description = ?, status = ? WHERE task_id = ?",
        [taskData.taskName, taskData.description, taskData.status, taskId],
        (err, result) => {
          if (err) {
            console.error("Error updating task data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // If subtasks are provided, update them in the database
          if (taskData.subTasks && taskData.subTasks.length > 0) {
            // Delete existing subtasks
            db.query(
              "DELETE FROM subtasks WHERE task_id = ?",
              [taskId],
              (deleteError) => {
                if (deleteError) {
                  console.error(
                    "Error deleting existing subtasks:",
                    deleteError
                  );
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }

                // Insert new subtasks
                const subTaskValues = taskData.subTasks.map((subTask) => [
                  taskId,
                  subTask,
                ]);

                db.query(
                  "INSERT INTO subtasks (task_id, subtask_name) VALUES ?",
                  [subTaskValues],
                  (subTaskError) => {
                    if (subTaskError) {
                      console.error(
                        "Error inserting new subtasks:",
                        subTaskError
                      );
                      return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                    }

                    console.log(
                      "Task and subtasks data are updated successfully"
                    );
                    return res.json({ message: "Task updated successfully" });
                  }
                );
              }
            );
          } else {
            // If no subtasks provided, respond with success
            console.log("Task data is updated successfully");
            return res.json({ message: "Task updated successfully" });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in editTaskController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = editTaskController;
