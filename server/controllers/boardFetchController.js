const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function boardFetchController(req, res) {
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

      const userId = decoded.userId;

      // Fetch boards for the user
      db.query(
        "SELECT board_id, board_name FROM boards WHERE user_id = ?",
        [userId],
        (err, result) => {
          if (err) {
            console.error("Error fetching boards:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Extract board names from the result
          // const boardNames = result.map((board) => board.board_name);

          // return res.json({ boardNames });
          return res.json({ tasks: result });
        }
      );
    });
  } catch (error) {
    console.error("Error in fetchBoards:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = boardFetchController;
