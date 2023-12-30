// boardDeleteController.js
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function boardDeleteController(req, res) {
  const { boardId } = req.params;
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

      // User is authenticated; you can access their user ID from the 'decoded' object
      const userId = decoded.userId;

      // Delete the board with the specified ID
      db.query(
        "DELETE FROM boards WHERE user_id = ? AND board_id = ?",
        [userId, boardId],
        (err, result) => {
          if (err) {
            console.error("Error deleting board:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (result.affectedRows === 0) {
            // No board was deleted, likely due to mismatched user ID or board ID
            return res.status(404).json({ error: "Board not found" });
          }

          // Delete tasks associated with the board
          db.query(
            "DELETE FROM tasks WHERE board_id = ?",
            [boardId],
            (taskErr, taskResult) => {
              if (taskErr) {
                console.error("Error deleting tasks:", taskErr);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              // Delete subtasks associated with the tasks
              db.query(
                "DELETE FROM subtasks WHERE task_id IN (SELECT task_id FROM tasks WHERE board_id = ?)",
                [boardId],
                (subtaskErr, subtaskResult) => {
                  if (subtaskErr) {
                    console.error("Error deleting subtasks:", subtaskErr);
                    return res
                      .status(500)
                      .json({ error: "Internal Server Error" });
                  }

                  return res.json({
                    message:
                      "Board and associated tasks/subtasks deleted successfully",
                  });
                }
              );
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Error in boardDeleteController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = boardDeleteController;
