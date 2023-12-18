// boardDeleteController.js
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function boardDeleteController(req, res) {
  const { taskId } = req.params;
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
        "DELETE FROM boards WHERE user_id = ? AND task_id = ?",
        [userId, taskId],
        (err, result) => {
          if (err) {
            console.error("Error deleting board:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (result.affectedRows === 0) {
            // No board was deleted, likely due to mismatched user ID or board ID
            return res.status(404).json({ error: "Board not found" });
          }

          return res.json({ message: "Board deleted successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error in boardDeleteController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = boardDeleteController;
