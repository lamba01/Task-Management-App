const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function getTaskStatusController(req, res) {
  const token = req.headers.authorization;
  const { taskId } = req.params;

  try {
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

      // Fetch task status for the user
      db.query(
        "SELECT status FROM tasks WHERE task_id = ?",
        [taskId],
        (err, result) => {
          if (err) {
            console.error("Error fetching task status:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Extract and send the status of the task
          const status = result[0] ? result[0].status : null;
          res.json({ status });
        }
      );
    });
  } catch (error) {
    console.error("Error in getTaskStatusController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getTaskStatusController;
