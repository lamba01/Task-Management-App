const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function subtaskFetchController(req, res) {
  const taskId = req.params.taskId;
  const token = req.headers.authorization;

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

      //   const userId = decoded.userId;

      db.query(
        "SELECT * FROM subtasks WHERE task_id = ?",
        [taskId],
        (err, result) => {
          if (err) {
            console.error("Error fetching subtasks:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          return res.json({ subtasks: result });
        }
      );
    });
  } catch (error) {
    console.error("Error in fetchsubtask:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = subtaskFetchController;
